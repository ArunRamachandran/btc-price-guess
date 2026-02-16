import { useEffect, useState } from "react";
import { useGameStore } from "../../store/useGameStore";
import styles from './game.module.css';

export const GuessTimer = () => {
  const { activeGuess, setTimerExpired } = useGameStore();
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (!activeGuess) return;

    const clock = () => {
      const elapsed = Math.floor((Date.now() - activeGuess.startTime) / 1000);
      const remaining = Math.max(0, 60 - elapsed);
      setTimeLeft(remaining);

      if (remaining === 0) {
        setTimerExpired(true); 
      }
    }

    const interval = setInterval(clock, 1000);
    clock();

    return () => clearInterval(interval);

  }, [activeGuess, setTimerExpired]);

  return (
    <div>
      <div className={styles.timerContainer}>
      <div className={styles.timerCircle}>
        <span className={styles.timerValue}>{timeLeft}s</span>
      </div>
      <p className={styles.lockPrice}>
        Locked at <strong>${activeGuess?.startPrice.toLocaleString()}</strong>
      </p>
    </div>
    </div>
  )
}