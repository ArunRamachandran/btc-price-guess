import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ActiveGuess {
  startPrice: number;
  startTime: number;
  direction: "up" | "down";
}

interface GameState {
  // user information
  userName: string;
  score: number;
  activeGuess: ActiveGuess | null;

  // actions
  setUserName: (name: string) => void;
  setGuess: (price: number, direction: "up" | "down") => void;
  resolveGuess: (currentPrice: number) => void;
  resetScore: () => void; // utility action to reset score, but will persist the username
  logout: () => void; // utility action to clear all user data
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      userName: "",
      score: 0,
      activeGuess: null,

      setUserName: (name) => set({ userName: name }),

      setGuess: (price, direction) => set({
        activeGuess: {
          startPrice: price,
          startTime: Date.now(),
          direction,
        }
      }),

      resolveGuess: (currentPrice) => {
        const { activeGuess, score } = get();
        if (!activeGuess) return;

        const isWin = activeGuess.direction === "up" ? 
          currentPrice > activeGuess.startPrice
          : currentPrice < activeGuess.startPrice;
        set({
          score: isWin ? score + 1 : score - 1,
          activeGuess: null,
        });
      },

      resetScore: () => set({ score: 0, activeGuess: null }),

      logout: () => set({ userName: "", score: 0, activeGuess: null }),
    }),
    {
      name: "btc-price-guess-storage", // name of the item in storage
    }
  )
);