import type { GuessStatus } from '../../types/game';
import styles from './game.module.css';

interface GuessResultProps {
  status: GuessStatus;
}

export const GuessResult = ({ status }: GuessResultProps) => {
  const getMessage = () => {
    switch (status) {
      case 'win':
        return { text: "Correct Prediction! +1", class: styles.winToast };
      case 'loss':
        return { text: "Price moved against you! -1", class: styles.lossToast };
      case 'pending':
        return { 
          text: "It's a tie! Waiting for the next price update to resolve...", 
          class: styles.pendingToast 
        };
      default:
        return null;
    }
  };

  const messageData = getMessage();
  if (!messageData) return null;

  return (
    <div className={messageData.class}>
      {status === 'pending' && <span className={styles.spinner} />}
      {messageData.text}
    </div>
  );
};