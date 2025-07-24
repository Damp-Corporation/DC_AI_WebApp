// components/FloatingChatButton.jsx
import { MessageCircle } from 'lucide-react';

export default function FloatingChatButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-26  right-6 z-50 bg-primary hover:bg-primary text-white p-4 rounded-full shadow-lg transition-all"
    >
      <MessageCircle size={24} /> 
    </button>
  );
}
