🧠 Multilingual Patient Feedback & Education Backend (Track 1 & 2)

> A Django backend system that supports:

Patient feedback collection (with NLP analysis, reminders via Twilio)

A GPT-powered educational chatbot using OpenAI API + ChromaDB





---

🛠 Technologies

Stack	Purpose

Django	Core backend framework
Django REST Framework	API creation
PostgreSQL	Database for patient feedback, user info
ChromaDB	Vector DB to store and retrieve chat context
Twilio API	For sending reminders via SMS/WhatsApp
OpenAI API	To power patient chatbot assistant
Google Translate API	Translate voice/text input (multilingual)
Whisper API	Convert speech to text



---




---

📦 Installation

1. Clone the Repo

git clone https://github.com/Damp-Corporation/DC_AI_WebApp/django_backend.git
cd backend

2. Create Virtual Environment & Activate

python -m venv env
source env/bin/activate  # On Windows use env\Scripts\activate

3. Install Dependencies

pip install -r requirements.txt

4. Configure Environment

Create a .env file in the project root:

OPENAI_API_KEY=your_openai_key
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend 
EMAIL_HOST=smtp.gmail.com 
EMAIL_PORT=587 
EMAIL_HOST_USER=youremail@example.com 
EMAIL_HOST_PASSWORD=your-email-password 
EMAIL_USE_TLS=True
TWILIO_ACCOUNT_SID=your-twilio-sid 
TWILIO_AUTH_TOKEN=your-twilio-token 
TWILIO_PHONE_NUMBER=+1234567890


---

💽 PostgreSQL Setup

Ensure PostgreSQL is running. Create a database and user:

CREATE DATABASE multilingual_feedback;
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE multilingual_feedback TO myuser;

Update settings.py:

DATABASES = {
  'default': {
    'ENGINE': 'django.db.backends.postgresql',
    'NAME': 'multilingual_feedback',
    'USER': 'myuser',
    'PASSWORD': 'mypassword',
    'HOST': 'localhost',
    'PORT': '5432',
  }
}


---

🧱 Run Migrations & Superuser

python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser


---

▶ Run the Server

python manage.py runserver

Go to: http://127.0.0.1:8000/admin


---

🧠 Chatbot API

POST /api/chatbot/chat/

{
  "message": "I have chest pain",
  "language": "fr",
  "patient_id": "123"
}

Response:

{
  "reply": "Cela pourrait être lié à votre cœur. Veuillez consulter un médecin immédiatement."
}


---

📝 Feedback API

POST /api/feedback/

{
  "patient_id": "001",
  "age": 30,
  "wait_time": 20,
  "resolution_time": 10,
  "gender": "female",
  "date": "2025-07-28",
  "department": "Cardiology",
  "rating": 2,
  "feedback": "Waited too long before being seen."
}

Response includes NLP sentiment, category, and alerts if negative.


---

📬 Sending Twilio Reminders

Voice and SMS reminders can be triggered via backend cron or admin trigger.

from twilio.rest import Client

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
message = client.messages.create(
  body="Dear patient, you have an appointment tomorrow at 9 AM.",
  from_=TWILIO_PHONE_NUMBER,
  to="+237XXXXXX"
)


---

🔍 ChromaDB Setup

Chroma is automatically initialized in chroma_db.py

It stores message embeddings via SentenceTransformers


pip install chromadb sentence-transformers


---

📘 Admin Tools

Admin panel lets you manage:

Users (with roles/permissions)

Incoming feedback

Alerts & negative sentiment reports

Twilio message logs




---

🌍 i18n + Voice Input

Voice input is processed with Whisper API

Translated via Google Translate API

NLP summary and insights extracted from multilingual text



---

🧾 License

MIT License


---

👨‍⚕ Created by

@abenprincely (BACKEND Engineer) of DAMP CORPORATION Team, Cameroon
