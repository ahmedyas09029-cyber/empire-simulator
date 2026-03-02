export function Sidebar({ activePanel, setActivePanel }) {
  const icons = [
    { id: 'upload', icon: '➕', label: 'Upload' },
    { id: 'chat', icon: '💬', label: 'Chat' },
    { id: 'search', icon: '🔎', label: 'Recherche' },
    { id: 'profile', icon: '👤', label: 'Profil' },
  ];

  const togglePanel = (panelId) => {
    setActivePanel(activePanel === panelId ? null : panelId);
  };

  return (
    <div className="fixed right-0 top-0 w-[70px] h-full bg-black bg-opacity-80 border-l border-[#222] flex flex-col items-center justify-center gap-6 z-50 backdrop-blur">
      {icons.map((item) => (
        <button
          key={item.id}
          onClick={() => togglePanel(item.id)}
          className={`w-11 h-11 rounded-2xl border border-[#222] flex items-center justify-center text-xl transition cursor-pointer ${
            activePanel === item.id
              ? 'bg-[#00f2ea] text-black'
              : 'bg-[#121212] hover:border-[#00f2ea] hover:text-[#00f2ea]'
          }`}
          title={item.label}
        >
          {item.icon}
        </button>
      ))}
      <button
        onClick={() => setActivePanel(null)}
        className="w-11 h-11 rounded-2xl border border-[#222] bg-[#121212] flex items-center justify-center text-xl hover:border-[#00f2ea] hover:text-[#00f2ea] transition cursor-pointer mt-auto mb-6"
        title="Accueil"
      >
        🏠
      </button>
    </div>
  );
}
