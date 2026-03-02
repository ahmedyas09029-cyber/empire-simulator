import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp, signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: err } = isSignUp
      ? await signUp(email, password)
      : await signIn(email, password);

    if (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="h-screen w-screen bg-[#050505] flex items-center justify-center">
      <div className="bg-[#121212] p-10 rounded-3xl border border-[#222] w-full max-w-sm">
        <h1 className="text-4xl font-black italic text-center mb-2">
          KORELI<span className="text-[#00f2ea]">.</span>
        </h1>
        <p className="text-gray-500 text-center mb-8 text-xs uppercase tracking-widest">
          Global Network
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Identifiant (Email)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-3 bg-black border border-[#222] rounded-2xl text-white outline-none focus:border-[#00f2ea] transition"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-3 bg-black border border-[#222] rounded-2xl text-white outline-none focus:border-[#00f2ea] transition"
            required
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#00f2ea] to-[#ff006e] rounded-2xl font-bold text-black uppercase tracking-wider disabled:opacity-50"
          >
            {loading ? 'Chargement...' : isSignUp ? 'Créer un agent' : 'Accéder au Nexus'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full text-xs text-gray-400 hover:text-white mt-4 transition"
        >
          {isSignUp ? 'Déjà un agent ?' : 'Créer un nouvel agent'}
        </button>
      </div>
    </div>
  );
}
