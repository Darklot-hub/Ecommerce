import { useState, useEffect, useRef } from "react";
import { FiX, FiPlay, FiPause, FiRotateCw } from "react-icons/fi";
import styles from "./Timer.module.css";

const INITIAL_SECONDS = 59 * 60;

function SpecialTimer({ onClose }) {
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);
  const [isRunning, setIsRunning] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  const intervalRef = useRef(null);

  const formatTime = (totalSeconds) => {
    if (totalSeconds <= 0) return "0:00:00";
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (isRunning && !isExpired && secondsLeft > 0) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [isRunning, isExpired, secondsLeft]);

  useEffect(() => {
    if (secondsLeft === 0 && !isExpired) {
      setIsExpired(true);
      setIsRunning(false);
    }
  }, [secondsLeft, isExpired]);

  const handleRestart = () => {
    stopTimer();
    setSecondsLeft(INITIAL_SECONDS);
    setIsExpired(false);
    setIsRunning(true);
  };

  const toggleRun = () => {
    if (isExpired) return;
    setIsRunning(!isRunning);
  };

  const displayValue = isExpired ? "таймер истёк" : formatTime(secondsLeft);

  return (
    <div className={styles.timerContainer}>
      <div className={styles.timerHeader}>
        <span className={styles.dealBadge}>🔥 SPECIAL DEAL</span>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
      </div>
      <div className={styles.timerDisplay}>{displayValue}</div>
      <div className={styles.timerControls}>
        <button
          className={styles.controlBtn}
          onClick={toggleRun}
          disabled={isExpired}
        >
          {isRunning ? <FiPause /> : <FiPlay />}
        </button>
        <button className={styles.controlBtn} onClick={handleRestart}>
          <FiRotateCw />
        </button>
      </div>
    </div>
  );
}

export default SpecialTimer;
