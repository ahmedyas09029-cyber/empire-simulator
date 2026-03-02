import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { Auth } from './components/Auth';
import { VideoFeed } from './components/VideoFeed';
import { Sidebar } from './components/Sidebar';
import { Panel } from './components/Panel';

function App() {
  const { user, loading } = useAuth();
  const [activePanel, setActivePanel] = useState(null);
  const [refreshFeed, setRefreshFeed] = useState(0);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-[#050505] flex items-center justify-center">
        <p className="text-[#00f2ea] text-lg">Initialisation du nexus...</p>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="h-screen w-screen bg-black overflow-hidden">
      <VideoFeed key={refreshFeed} />
      <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />
      <Panel
        activePanel={activePanel}
        user={user}
        setActivePanel={setActivePanel}
        onUploadSuccess={() => setRefreshFeed((prev) => prev + 1)}
      />
    </div>
  );
}

export default App;
