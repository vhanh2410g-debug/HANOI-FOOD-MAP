import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

export default function IntroExperience({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1750;
    let frame;
    let leaveTimer;
    let finishTimer;
    const advance = now => {
      const value = Math.min(100, Math.round(((now - start) / duration) * 100));
      setProgress(value);
      if (value < 100) frame = requestAnimationFrame(advance);
      else {
        leaveTimer = window.setTimeout(() => setLeaving(true), 180);
        finishTimer = window.setTimeout(onComplete, 650);
      }
    };
    frame = requestAnimationFrame(advance);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return <div className={`intro-screen ${leaving ? 'is-leaving' : ''}`} role="dialog" aria-modal="true" aria-label="Hanoi Food Map đang mở">
    <div className="intro-card">
      <div className="intro-brand"><span>🍊</span> HANOI <b>FOOD MAP</b></div>
      <div className="intro-route-scene" aria-hidden="true">
        <svg className="intro-route-line" viewBox="0 0 300 90"><path d="M25 66 C82 5 136 83 190 35 S253 21 274 42"/></svg>
        <span className="intro-map-pin"><MapPin size={30} fill="currentColor"/></span>
        <span className="intro-food-bowl">🍜</span>
        <span className="intro-route-spark">✦</span>
      </div>
      <h1>Hà Nội, ăn gì?</h1>
      <p>Đang tìm một món ngon cho chuyến đi của bạn</p>
      <div className="intro-progress"><i style={{ width: `${progress}%` }}/></div>
      <button className="intro-skip" onClick={onComplete}>Vào khám phá <span>↗</span></button>
    </div>
  </div>;
}
