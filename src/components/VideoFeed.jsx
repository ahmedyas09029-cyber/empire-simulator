import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';

export function VideoFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef({});

  useEffect(() => {
    loadPosts();
    setupIntersectionObserver();
  }, []);

  const loadPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('id, user_id, image_url, content, created_at, profiles(email)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  };

  const setupIntersectionObserver = () => {
    setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target.querySelector('video');
            if (!video) return;
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.7 }
      );

      document.querySelectorAll('.video-card').forEach((card) => {
        observer.observe(card);
      });
    }, 100);
  };

  const toggleSound = (postId) => {
    const video = videoRefs.current[postId];
    if (video) {
      video.muted = !video.muted;
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <p className="text-[#00f2ea] text-lg">Chargement du nexus...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-black">
      {posts.length === 0 ? (
        <div className="h-screen w-full flex items-center justify-center">
          <p className="text-gray-500 text-lg">Aucune vidéo disponible</p>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="video-card relative h-screen w-full snap-start">
            <video
              ref={(el) => (videoRefs.current[post.id] = el)}
              src={post.image_url}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => toggleSound(post.id)}
              muted
              loop
              playsInline
            />

            <div className="absolute bottom-24 left-6 z-50">
              <h3 className="text-[#00f2ea] font-black text-lg">
                @AGENT_{post.user_id.slice(0, 4).toUpperCase()}
              </h3>
              {post.content && (
                <p className="text-sm opacity-80 max-w-xs mt-2">{post.content}</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
