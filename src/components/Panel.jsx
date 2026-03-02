import { Upload } from './Upload';
import { Chat } from './Chat';
import { Search } from './Search';
import { Profile } from './Profile';

export function Panel({ activePanel, user, setActivePanel, onUploadSuccess }) {
  if (!activePanel) return null;

  return (
    <div className="fixed right-[70px] top-0 w-80 h-full bg-[#121212] border-l border-[#222] z-40 p-6 overflow-y-auto shadow-lg">
      {activePanel === 'upload' && (
        <Upload user={user} onUploadSuccess={() => {
          onUploadSuccess();
          setActivePanel(null);
        }} />
      )}
      {activePanel === 'chat' && <Chat user={user} />}
      {activePanel === 'search' && <Search />}
      {activePanel === 'profile' && <Profile user={user} />}
    </div>
  );
}
