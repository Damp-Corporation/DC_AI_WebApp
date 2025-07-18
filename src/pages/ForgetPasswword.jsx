import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ForgetPassword() {
  const { t } = useTranslation()
  const initialValues = { email: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("forgetPassword.emailInvalid"))
      .required(t("forgetPassword.emailRequired")),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Simule une requête (remplacer par appel API réel)
    setTimeout(() => {
      console.log("Demande de réinitialisation envoyée à:", values.email);

      Swal.fire({
        icon: "success",
        title: t("forgetPassword.successtitle"),
        text: `t("forgetPassword.successText") ${values.email}.`,
        confirmButtonColor: "#3B82F6",
      });

      setSubmitting(false);
      resetForm();
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center px-4 py-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {t("forgetPassword.title")}
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t("forgetPassword.emailLabel")}
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder={t("forgetPassword.emailPlaceholder")}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary"
              >
                {isSubmitting ? t("forgetPassword.sending") : t("forgetPassword.submit")}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-blue-600 hover:underline text-sm">
            {t("forgetPassword.backToLogin")}
          </Link>
        </div>
      </div>
    </div>
  );
}
