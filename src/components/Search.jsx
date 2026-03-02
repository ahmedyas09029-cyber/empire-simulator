import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const search = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email')
        .ilike('email', `%${query}%`)
        .limit(10);

      if (!error && data) {
        setResults(data);
      }
      setLoading(false);
    };

    const timer = setTimeout(search, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">RECHERCHE AGENTS</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Nom de l'agent..."
        className="w-full px-3 py-2 bg-black border border-[#222] rounded-2xl text-white outline-none focus:border-[#00f2ea] mb-4"
      />

      <div className="space-y-2">
        {loading && <p className="text-gray-500 text-sm">Recherche...</p>}
        {results.length === 0 && query && !loading && (
          <p className="text-gray-500 text-sm">Aucun agent trouvé</p>
        )}
        {results.map((user) => (
          <div key={user.id} className="p-3 bg-[#222] rounded-xl hover:bg-[#333] transition cursor-pointer">
            <p className="text-sm font-mono">{user.email}</p>
            <p className="text-xs text-gray-500">ID: {user.id.slice(0, 8)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
