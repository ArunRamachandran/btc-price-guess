import { useState } from "react";
import { useGameStore } from "../store/useGameStore";

export const OnBoarding = () => {
  const [userInput, setUserInput] = useState<string>("");
  const setUserName = (useGameStore((state) => state.setUserName));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    setUserName(userInput.trim());
  };

  return (
    <div>
      <h1>Welcome to BTC Price Guess</h1>
      <p>Please enter your username to start playing!</p>
      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          type="text"
          value={userInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)}
          placeholder="Enter your username"
        />
        <button type="submit">Start Playing</button>
      </form>
    </div>
  )
};