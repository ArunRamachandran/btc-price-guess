import { GUESS_DIRECTION, type GuessDirection } from '../../types/game';
import styles from './game.module.css';


interface GuessControlsProps {
  onGuess: (direction: GuessDirection) => void;
  disabled: boolean;
}

export const GuessControls = ({ onGuess, disabled }: GuessControlsProps) => {
  return (
    <div className={styles.controlsContainer}>
      <button 
        type="button"
        className={`${styles.guessButton} ${styles.upButton}`}
        onClick={() => onGuess(GUESS_DIRECTION.UP)}
        disabled={disabled}
        aria-label="Predict price will go up"
      >
        <span className={styles.icon} aria-hidden="true">▲</span>
        <span>Predict UP</span>
      </button>
      
      <button 
        type="button"
        className={`${styles.guessButton} ${styles.downButton}`}
        onClick={() => onGuess(GUESS_DIRECTION.DOWN)}
        disabled={disabled}
        aria-label="Predict price will go down"
      >
        <span className={styles.icon} aria-hidden="true">▼</span>
        <span>Predict DOWN</span>
      </button>
    </div>
  )
}