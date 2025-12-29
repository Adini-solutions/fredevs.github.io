import { useEffect } from "react";

export default function useAutoplayVideoInView(
  videoRef,
  inView,
  { pauseWhenOut = true } = {}
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
        });
      }
    } else if (pauseWhenOut) {
      video.pause();
    }
  }, [inView, videoRef, pauseWhenOut]);
}
