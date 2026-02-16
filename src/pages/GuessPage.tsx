import { useEffect, useMemo } from "react";
import { GuessControls } from "../features/game/GuessControls";
import { GuessTimer } from "../features/game/GuessTimer";
import { PriceTracker } from "../features/game/PriceTracker"
import { UserHeader } from "../features/game/UserHeader"
import { useBtcPrice } from "../hooks/useBtcPrice";
import { useGameStore } from "../store/useGameStore";
import { GUESS_STATUS, type GuessDirection, type GuessStatus } from "../types/game";
import styles from './GuessPage.module.css';
import { GuessResult } from "../features/game/GuessResult";

export const GuessPage = () => {
  const { 
    activeGuess, 
    resolveGuess, 
    setGuess, 
    isTimerExpired, 
    lastResult,
    clearResult 
  } = useGameStore();
  const { price } = useBtcPrice();

  // Derive status for the GuessResult component
  const status = useMemo((): GuessStatus => {
    if (activeGuess && isTimerExpired) return GUESS_STATUS.PENDING;
    if (lastResult !== null) return lastResult ? GUESS_STATUS.WIN : GUESS_STATUS.LOSS;
    return null;
  }, [activeGuess, isTimerExpired, lastResult]);

  useEffect(() => {
    if (isTimerExpired && activeGuess && price && price !== activeGuess.startPrice) {
      resolveGuess(price);
    }
  }, [isTimerExpired, price, resolveGuess, activeGuess, clearResult]);

  // Handle auto-clear of result after showing win/loss message
  useEffect(() => {
    if (lastResult !== null) {
      const timer = setTimeout(() => {
        clearResult();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [lastResult, clearResult]);

  // Clean up the screen on first mount
  useEffect(() => {
    if (lastResult !== null && !activeGuess) {
      clearResult();
    }
  }, []);
  
  return (
    <main className={styles.layout}>
      <UserHeader />
      <PriceTracker />
      <div className={styles.actionSection}>
        {
          activeGuess ? 
            <GuessTimer /> :
            <GuessControls 
              onGuess={(dir: GuessDirection) => {
                if (price) setGuess(price, dir);
              }}
              disabled={!price}
            />
        }
      </div>
      <GuessResult status={status} />
    </main>
  )
}