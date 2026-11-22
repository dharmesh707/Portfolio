type VideoPlayerProps = {
  src: string | null;
  title: string;
};

function youTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/,
  );
  return match?.[1] ?? null;
}

export default function VideoPlayer({ src, title }: VideoPlayerProps) {
  if (!src) {
    return (
      <div className="video-box">
        <div className="video-empty">
          <strong>Demo video coming soon</strong>
          <span>A walkthrough of {title} will appear here.</span>
        </div>
      </div>
    );
  }

  const ytId = youTubeId(src);

  return (
    <div className="video-box">
      {ytId ? (
        <iframe
          src={`https://www.youtube.com/embed/${ytId}`}
          title={`${title} demo`}
          allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video key={src} src={src} controls playsInline preload="metadata">
          Your browser does not support video playback.
        </video>
      )}
    </div>
  );
}
