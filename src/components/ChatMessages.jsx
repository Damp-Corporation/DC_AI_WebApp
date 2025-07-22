import { useState } from 'react';
import FeedbackButtons from './FeedbackButtons';

const ChatMessages = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Bonjour ! Comment puis-je vous aider aujourd’hui ?' },
  ]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`max-w-sm px-4 py-2 rounded-lg ${
            msg.sender === 'ai'
              ? 'bg-blue-100 text-gray-800 self-start'
              : 'bg-green-100 text-gray-800 self-end ml-auto'
          }`}
        >
          {msg.text}
          {msg.sender === 'ai' && <FeedbackButtons />}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
