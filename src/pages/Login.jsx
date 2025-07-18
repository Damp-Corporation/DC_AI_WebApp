'use client';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Login = () => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email(t('login.invalidEmail')).required(t('login.required')),
      password: Yup.string().required(t('login.required')),
    }),
    onSubmit: async (values) => {
      try {
        console.log('Login values:', values);
        // await loginUser(values);
        formik.resetForm();
      } catch (err) {
        setError(t('login.failed'));
      }
    },
  });

  return (
    <div className="flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-xl">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          {t('login.title')}
        </h2>

        <form className="mt-6 space-y-5" onSubmit={formik.handleSubmit}>
          <div className='mb-4'>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('login.email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className='mb-4'>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {t('login.password')}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                name="remember"
                onChange={formik.handleChange}
                checked={formik.values.remember}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2">{t('login.remember')}</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
              {t('login.forgot')}
            </Link>
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md shadow-sm text-white bg-primary hover:bg-primry focus:outline-none"
          >
            {t('login.submit')}
          </button>
        </form>

        {/* Lien d'inscription */}
        <p className="mt-6 text-center text-sm text-gray-600">
          {t('login.noAccount')}{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            {t('login.signup')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
