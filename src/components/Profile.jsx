import { useAuth } from '../hooks/useAuth';

export function Profile({ user }) {
  const { signOut } = useAuth();

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">VOTRE PROFIL</h2>

      <div className="p-4 bg-black rounded-xl mb-4 text-center border border-[#222]">
        <p className="text-[#00f2ea] font-mono text-sm break-all">{user.email}</p>
        <p className="text-xs text-gray-500 mt-2">ID: {user.id.slice(0, 12)}</p>
      </div>

      <button
        onClick={signOut}
        className="w-full py-3 bg-red-600 rounded-2xl font-bold text-white uppercase tracking-wider hover:bg-red-700 transition"
      >
        DÉCONNEXION
      </button>
    </div>
  );
}
