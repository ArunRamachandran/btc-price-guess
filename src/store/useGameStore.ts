import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GUESS_DIRECTION, type GuessDirection } from "../types/game";
import { syncScoreToAWS } from "../services/scoreService";

interface ActiveGuess {
  startPrice: number;
  startTime: number;
  direction: GuessDirection;
}

interface GameState {
  // user information
  userName: string;
  score: number;
  activeGuess: ActiveGuess | null;

  // the signal from the timer
  isTimerExpired: boolean;

  // Most recent guess status, used to trigger the alert in GuessPage when a guess is resolved
  lastResult: boolean | null; // true = win, false = loss, null = none/pending

  // actions
  setUserName: (name: string) => void;
  setTimerExpired: (expired: boolean) => void;
  setGuess: (price: number, direction: GuessDirection) => void;
  resolveGuess: (currentPrice: number) => void;
  clearResult: () => void; // utility action to clear the lastResult state after showing the alert
  resetScore: () => void; // TBD: utility action to reset score, but will persist the username
  logout: () => void; // TBD: utility action to clear all user data
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      userName: "",
      score: 0,
      activeGuess: null,
      isTimerExpired: false,
      lastResult: null,

      setUserName: (name: string) => set({ userName: name }),

      setTimerExpired: (expired: boolean) => set({ isTimerExpired: expired }),

      setGuess: (price, direction) => set({
        activeGuess: {
          startPrice: price,
          startTime: Date.now(),
          direction,
        },
        isTimerExpired: false,
        lastResult: null,
      }),

      resolveGuess: (currentPrice) => {
        const { activeGuess, score, userName } = get();
        if (!activeGuess) return;

        const isWin = activeGuess.direction === GUESS_DIRECTION.UP ? 
          currentPrice > activeGuess.startPrice
          : currentPrice < activeGuess.startPrice;
        const newScore = isWin ? score + 1 : Math.max(0, score - 1);

        set({
          score: newScore,
          activeGuess: null,
          isTimerExpired: false,
          lastResult: isWin,
        });

        // Sync score to AWS
        syncScoreToAWS(userName, newScore).catch((err) => {
          console.error("Background sync failed:", err);
        });
      },

      clearResult: () => set({ lastResult: null, isTimerExpired: false }),
      resetScore: () => set({ score: 0, activeGuess: null, lastResult: null }),
      logout: () => set({ userName: "", score: 0, activeGuess: null, lastResult: null }),
    }),
    {
      name: "btc-price-guess-storage", // name of the item in storage
    }
  )
);