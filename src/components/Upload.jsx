import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function Upload({ user, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Sélectionnez une vidéo');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from('videos').getPublicUrl(fileName);

      const { error: insertError } = await supabase.from('posts').insert({
        user_id: user.id,
        image_url: publicUrl,
        content: description,
      });

      if (insertError) throw insertError;

      setFile(null);
      setDescription('');
      onUploadSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <h2 className="text-xl font-bold">DÉPLOYER VIDÉO</h2>

      <label className="block">
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full px-3 py-2 bg-black border border-[#222] rounded-2xl text-white cursor-pointer"
        />
      </label>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description de la mission..."
        rows={4}
        className="w-full px-3 py-2 bg-black border border-[#222] rounded-2xl text-white outline-none focus:border-[#00f2ea] resize-none"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-[#00f2ea] to-[#ff006e] rounded-2xl font-bold text-black uppercase tracking-wider disabled:opacity-50"
      >
        {loading ? 'PUBLICATION...' : 'PUBLIER MAINTENANT'}
      </button>
    </form>
  );
}
