import { useCallback } from 'react';

export const useGameSounds = (enabled: boolean) => {
  const playCorrect = useCallback(() => {
    if (!enabled) return;
    const audio = new Audio('/sounds/correct.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {});
  }, [enabled]);

  const playWrong = useCallback(() => {
    if (!enabled) return;
    const audio = new Audio('/sounds/wrong.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {});
  }, [enabled]);

  const playWin = useCallback(() => {
    if (!enabled) return;
    const audio = new Audio('/sounds/win.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {});
  }, [enabled]);

  const playLose = useCallback(() => {
    if (!enabled) return;
    const audio = new Audio('/sounds/lose.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {});
  }, [enabled]);

  return {
    playCorrect,
    playWrong,
    playWin,
    playLose
  };
};