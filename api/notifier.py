from twilio.rest import Client
import os

def send_reminder(to_number, message):
    client = Client(os.getenv("TWILIO_SID"), os.getenv("TWILIO_AUTH"))
    client.messages.create(
        body=message,
        from_=os.getenv("TWILIO_PHONE"),
        to=to_number
    )