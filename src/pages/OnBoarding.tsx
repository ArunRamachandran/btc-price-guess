import { useState } from "react";
import { useGameStore } from "../store/useGameStore";
import styles from './OnBoarding.module.css';

export const OnBoarding = () => {
  const [userInput, setUserInput] = useState<string>("");
  const setUserName = useGameStore((state) => state.setUserName);

  const isValidUserName = userInput.trim().length >= 2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidUserName) return;
    setUserName(userInput.trim());
  };

  return (
    <div className={styles.container}>
      <h1>Ready for a Challenge?</h1>
      <p>Please enter your username to start playing BTC Price Guess!</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input
            autoFocus
            id="userName"
            type="text"
            required
            className={styles.input}
            value={userInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)}
            placeholder="Your Username"
          />
          <button type="submit" className={styles.button} disabled={!isValidUserName}>
            Start Playing
          </button>
        </div>
        {!isValidUserName && userInput.length > 0 && (
          <span className={styles.error}>Name must be at least 2 characters</span>
        )}
      </form>
    </div>
  )
};