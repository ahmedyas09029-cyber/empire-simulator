import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

export function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadMessages();
    const subscription = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('id, user_id, content, created_at, profiles(email)')
      .order('created_at', { ascending: true })
      .limit(50);

    if (!error && data) {
      setMessages(data);
    }
    setLoading(false);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const { error } = await supabase.from('messages').insert({
      user_id: user.id,
      content: input,
    });

    if (!error) {
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4">MESSAGERIE</h2>

      <div className="flex-1 overflow-y-auto mb-4 space-y-3 border-b border-[#222] pb-4">
        {messages.length === 0 && (
          <p className="text-gray-500 text-sm text-center mt-4">
            Aucun message. Soyez le premier !
          </p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-xl ${
              msg.user_id === user.id
                ? 'bg-[#00f2ea] text-black ml-4'
                : 'bg-[#222] text-white mr-4'
            }`}
          >
            <p className="text-xs font-mono mb-1">
              {msg.profiles?.email?.split('@')[0] || 'Agent'}
            </p>
            <p className="text-sm break-words">{msg.content}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message privé..."
          className="flex-1 px-3 py-2 bg-black border border-[#222] rounded-2xl text-white outline-none focus:border-[#00f2ea]"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#00f2ea] text-black rounded-2xl font-bold text-sm hover:opacity-80 transition"
        >
          →
        </button>
      </form>
    </div>
  );
}
