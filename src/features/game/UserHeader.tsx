import { useGameStore } from '../../store/useGameStore';
import styles from './game.module.css';

export const UserHeader = () => {
  const { userName, score, logout } = useGameStore();
  return (
    <header className={styles.header}>
      <div className={styles.userDetails}>
        <div className={styles.badge}>
          <span className={styles.tag}>Player</span>
          <strong>{userName}</strong>
        </div>
        <div className={styles.badge}>
          <span className={styles.tag}>Score</span>
          <strong className={styles.accent}>{score}</strong>
        </div>
      </div>
      <div className={styles.logoutButton} onClick={logout}>Logout</div>
    </header>
  );
};