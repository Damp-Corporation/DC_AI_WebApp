from textblob import TextBlob
from googletrans import Translator

def translate_text(text, dest='en'):
    return Translator().translate(text, dest=dest).text

def analyze_feedback(text):
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity
    sentiment = 'positive' if polarity > 0.3 else 'negative' if polarity < -0.3 else 'neutral'
    summary = ' '.join(blob.noun_phrases)
    theme = 'staff' if 'staff' in text.lower() else 'waiting time' if 'wait' in text.lower() else 'general'
    alert = sentiment == 'negative'
    return sentiment, theme, summary, alert