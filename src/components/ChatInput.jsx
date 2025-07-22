import { useState } from 'react';
import { Send } from 'lucide-react';

const ChatInput = () => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // à remplacer par appel API backend + mise à jour messages
    console.log('Question posée :', input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="border-t p-4 flex items-center">
      <input
        type="text"
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
        placeholder="Posez votre question ici..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="ml-2 text-white bg-blue-600 p-2 rounded hover:bg-blue-700"
      >
        <Send size={18} />
      </button>
    </form>
  );
};

export default ChatInput;
