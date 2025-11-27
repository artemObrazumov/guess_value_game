import { useState } from "react";
import "./GuessNumberGame.css";

const GuessNumberGame = () => {
  const [targetNumber, setTargetNumber] = useState(null);
  const [userGuess, setUserGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [guessHistory, setGuessHistory] = useState([]);
  const [minRange, setMinRange] = useState(1);
  const [maxRange, setMaxRange] = useState(100);

  const validateRange = () => {
    const min = parseInt(minRange);
    const max = parseInt(maxRange);

    if (isNaN(min) || isNaN(max)) {
      return "Оба значения должны быть числами";
    }

    if (min >= max) {
      return "Минимальное число должно быть меньше максимального";
    }

    if (max == min) {
      return "Числа не могут быть равны";
    }

    return null;
  };

  const startGame = () => {
    const validationError = validateRange();
    if (validationError) {
      setMessage(validationError);
      return;
    }

    const min = parseInt(minRange);
    const max = parseInt(maxRange);
    const newTarget = Math.floor(Math.random() * (max - min + 1)) + min;

    setTargetNumber(newTarget);
    setUserGuess("");
    setMessage(`Загадано число от ${min} до ${max}`);
    setAttempts(0);
    setGameStarted(true);
    setGameWon(false);
    setGuessHistory([]);
  };

  const handleGuess = (e) => {
    e.preventDefault();

    const guess = parseInt(userGuess);
    const min = parseInt(minRange);
    const max = parseInt(maxRange);

    if (isNaN(guess) || guess < min || guess > max) {
      setMessage(`введите число от ${min} до ${max}`);
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    setGuessHistory((prev) => [...prev, guess]);

    if (guess === targetNumber) {
      setMessage(`Угадано число ${targetNumber} за ${newAttempts} попыток`);
      setGameWon(true);
    } else if (guess < targetNumber) {
      setMessage("Слишком маленькое число");
    } else {
      setMessage("Слишком большое число");
    }

    setUserGuess("");
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameWon(false);
    setTargetNumber(null);
    setUserGuess("");
    setMessage("");
    setAttempts(0);
    setGuessHistory([]);
  };

  return (
    <div className="guess-number-game">
      <div className="game-container">
        <h1>Угадай число</h1>

        {!gameStarted ? (
          <div className="setup-screen">
            <div className="range-selection">
              <h3>Выбери диапазон чисел</h3>

              <div className="custom-range">
                <div className="range-inputs">
                  <div className="input-group">
                    <label>От:</label>
                    <input
                      type="number"
                      value={minRange}
                      onChange={(e) => setMinRange(e.target.value)}
                      className="range-input"
                    />
                  </div>
                  <div className="input-group">
                    <label>До:</label>
                    <input
                      type="number"
                      value={maxRange}
                      onChange={(e) => setMaxRange(e.target.value)}
                      className="range-input"
                    />
                  </div>
                </div>
                <div className="range-info">
                  {validateRange() ? (
                    <span className="error-text">{validateRange()}</span>
                  ) : (
                    <span>Диапазон: {maxRange - minRange + 1} чисел</span>
                  )}
                </div>
              </div>
            </div>

            <button
              className="start-button"
              onClick={startGame}
              disabled={!!validateRange()}
            >
              Начать игру
            </button>

            {message && <p className="error-message">{message}</p>}
          </div>
        ) : (
          <div className="game-screen">
            <div className="game-header">
              <div className="range-display">
                Диапазон: {minRange} - {maxRange}
              </div>
            </div>

            <div className="game-info">
              <p>Попыток: {attempts}</p>
              <p className="message">{message}</p>
            </div>

            <form onSubmit={handleGuess} className="guess-form">
              <input
                type="number"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                placeholder={`Введите число от ${minRange} до ${maxRange}`}
                min={minRange}
                max={maxRange}
                disabled={gameWon}
                className="guess-input"
              />
              <button type="submit" disabled={gameWon} className="guess-button">
                Проверить
              </button>
            </form>

            {guessHistory.length > 0 && (
              <div className="history">
                <h3>История догадок:</h3>
                <div className="history-list">
                  {guessHistory.map((item, index) => (
                    <div
                      key={index}
                      className={`history-item ${
                        item === targetNumber
                          ? "correct"
                          : item < targetNumber
                          ? "low"
                          : "high"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {gameWon && (
              <div className="win-screen">
                <button className="restart-button" onClick={resetGame}>
                  Играть снова
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GuessNumberGame;
