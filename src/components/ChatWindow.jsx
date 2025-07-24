import {
  X, Send, CalendarCheck, HelpCircle, AlertTriangle, Mic, Volume2, VolumeX
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ChatWindow({ onClose, setHasUnread, messages, setMessages }) {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [playVoice, setPlayVoice] = useState(true);
  const [language, setLanguage] = useState('fr-FR');

  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Bot speech
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.from === 'bot' && lastMsg.text && playVoice) {
      const utterance = new SpeechSynthesisUtterance(lastMsg.text);
      utterance.lang = language;
      speechSynthesis.speak(utterance);
    }

    if (!document.querySelector('.chat-window')) {
      setHasUnread(true);
    }
  }, [messages]);

  const handleSend = (text = input) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: "Merci pour votre question. Je vous réponds dans un instant." }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleButtonClick = (value) => {
    setMessages(prev => [
      ...prev,
      { from: 'user', text: value }
    ]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: `Vous avez sélectionné : "${value}". Un agent va vous aider sous peu.` }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  // Voice
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const toggleVoiceInput = () => {
    if (!SpeechRecognition) return alert("Votre navigateur ne supporte pas la reconnaissance vocale.");

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleSend(transcript);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="chat-window fixed bottom-44 right-6 w-full max-w-sm bg-white border-gray-200 rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-primary text-white px-4 py-3 flex justify-between items-center">
        <h2 className="text-sm font-semibold">Assistant Santé</h2>
        <div className="flex gap-2 items-center">
          {/* Langue */}
          {/* <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="text-xs text-black rounded px-1"
          >
            <option value="fr-FR">FR</option>
            <option value="en-US">EN</option>
          </select> */}
          <button onClick={onClose}><X size={20} /></button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto max-h-96 text-gray-800">
        {messages.map((msg, idx) => {
          if (msg.type === 'buttons') {
            return (
              <div key={idx} className="flex flex-wrap gap-2">
                {msg.buttons.map((btn, i) => (
                  <button
                    key={i}
                    onClick={() => handleButtonClick(btn.value)}
                    className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 border px-3 py-1.5 rounded-full transition"
                  >
                    {btn.icon}
                    {btn.label}
                  </button>
                ))}
              </div>
            );
          }

          return (
            <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.from === 'bot' && (
                <div className="w-6 h-6 mr-2">
                  <img src="/bot.jpg" alt="Bot" className="rounded-full w-full h-full border" />
                </div>
              )}
              <div
                className={`text-sm p-2 rounded-lg max-w-[80%] ${
                  msg.from === 'user'
                    ? 'bg-indigo-100 text-right'
                    : 'bg-gray-100 text-left'
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        {isTyping && (
          <div className="text-xs text-gray-500 italic">écrit...</div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-quaternary flex items-center gap-2 bg-white">
        <input
          type="text"
          className="flex-1 text-sm px-4 py-2 border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Posez une question..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />

        <button
          onClick={toggleVoiceInput}
          className={`p-2 rounded-full transition ${
            isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          title="Parler"
        >
          <Mic size={16} />
        </button>

        <button
          onClick={() => setPlayVoice(!playVoice)}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          title={playVoice ? "Désactiver la voix" : "Activer la voix"}
        >
          {playVoice ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>

        <button
          className="bg-primary text-white p-2 rounded-full hover:bg-primary/80 transition"
          onClick={() => handleSend(input)}
        >
          <Send size={16} />
        </button>
      </div>
    </motion.div>
  );
}
