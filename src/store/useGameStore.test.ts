import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGameStore } from './useGameStore';

describe('useGameStore Game Logic', () => {
  // Reset the store before each test so they don't interfere
  beforeEach(() => {
    const { result } = renderHook(() => useGameStore());
    act(() => {
      result.current.setUserName("TestPlayer");
      result.current.resetScore();
    });
  });

  it('should NOT increment score on a wrong "UP" guess (price decreased)', () => {
    const { result } = renderHook(() => useGameStore());

    act(() => {
      result.current.setGuess(60000, 'up');
    });

    act(() => {
      result.current.resolveGuess(59000);
    });

    expect(result.current.lastResult).toBe(false); // Loss
    expect(result.current.score).toBe(0); 
  });

  it('should increment score on a correct "DOWN" guess (price decreased)', () => {
    const { result } = renderHook(() => useGameStore());

    act(() => {
      result.current.setGuess(60000, 'down');
    });

    act(() => {
      result.current.resolveGuess(59000);
    });

    expect(result.current.lastResult).toBe(true); // Win
    expect(result.current.score).toBe(1);
  });
});