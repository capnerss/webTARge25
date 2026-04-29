import { useState, useEffect, useCallback } from 'react';


const WORD_LIST = [
  "REACT", "JAVASCRIPT", "COMPONENT", "FRONTEND",
  "DEVELOPER", "INTERFACE", "HOOKS", "PROPS", "JAVA", "ARRAY", "CONST",
  "RETURN",  "FUNCTION", "USEEFFECT"
];

const MAX_MISTAKES = 6;

const HANGMAN_PARTS = [
  <circle cx="150" cy="90" r="20" stroke="black" strokeWidth="4" fill="transparent" key="head" />, // Head
  <line x1="150" y1="110" x2="150" y2="170" stroke="black" strokeWidth="4" key="body" />,         // Body
  <line x1="150" y1="130" x2="120" y2="160" stroke="black" strokeWidth="4" key="left-arm" />,     // Left Arm
  <line x1="150" y1="130" x2="180" y2="160" stroke="black" strokeWidth="4" key="right-arm" />,    // Right Arm
  <line x1="150" y1="170" x2="120" y2="220" stroke="black" strokeWidth="4" key="left-leg" />,     // Left Leg
  <line x1="150" y1="170" x2="180" y2="220" stroke="black" strokeWidth="4" key="right-leg" />     // Right Leg
];

export default function HangmanGame() {
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
 const startNewGame = () => {
    const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    setWord(randomWord);
    setGuessedLetters([]);
  };

  // Initialize the game with a random word on first load
  useEffect(() => {
    startNewGame();
  }, []);



  const incorrectGuesses = guessedLetters.filter(letter => !word.includes(letter));
  const mistakes = incorrectGuesses.length;

  const isLoser = mistakes >= MAX_MISTAKES;
  const isWinner = word !== "" && word.split('').every(letter => guessedLetters.includes(letter));

  const handleGuess = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return;
    setGuessedLetters(prev => [...prev, letter]);
  }, [guessedLetters, isLoser, isWinner]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) {
        handleGuess(key);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleGuess]);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

  return (
    <div style={styles.container}>
      <h1>Martin Puura</h1>


      <div style={styles.status}>
        {isWinner && <span style={{ color: 'green' }}>Voit!</span>}
        {isLoser && <span style={{ color: 'red' }}>Loll! Sona oli {word}</span>}
        {!isWinner && !isLoser && <span>Vead: {mistakes} / {MAX_MISTAKES}</span>}
      </div>


      <svg height="250" width="250" style={styles.svg}>
        <line x1="10" y1="240" x2="90" y2="240" stroke="black" strokeWidth="4" />
        <line x1="50" y1="240" x2="50" y2="20" stroke="black" strokeWidth="4" />
        <line x1="50" y1="20" x2="150" y2="20" stroke="black" strokeWidth="4" />
        <line x1="150" y1="20" x2="150" y2="50" stroke="black" strokeWidth="4" />

        {HANGMAN_PARTS.slice(0, mistakes)}
      </svg>


      <div style={styles.wordContainer}>
        {word.split('').map((letter, index) => (
          <span key={index} style={styles.letterUnderline}>
            <span style={{
              visibility: guessedLetters.includes(letter) || isLoser ? 'visible' : 'hidden',
              color: !guessedLetters.includes(letter) && isLoser ? 'red' : 'black'
            }}>
              {letter}
            </span>
          </span>
        ))}
      </div>

      <div style={styles.keyboard}>
        {alphabet.map(letter => {
          const isGuessed = guessedLetters.includes(letter);
          const isCorrect = isGuessed && word.includes(letter);
          const isWrong = isGuessed && !word.includes(letter);

          return (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={isGuessed || isWinner || isLoser}
              style={{
                ...styles.key,
                backgroundColor: isCorrect ? '#4ade80' : isWrong ? '#f87171' : '#e5e7eb',
                opacity: isGuessed ? 0.6 : 1,
                cursor: isGuessed || isWinner || isLoser ? 'not-allowed' : 'pointer'
              }}
            >
              {letter}
            </button>
          );
        })}
      </div>


      {(isWinner || isLoser) && (
        <button onClick={startNewGame} style={styles.resetButton}>
          Uus mang
        </button>
      )}
    </div>
  );
}


const styles = {
  container: {
    fontFamily: 'sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#e8f1ed',
  },
  status: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    height: '24px',
  },
  svg: {
    marginBottom: '30px',
  },
  wordContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '40px',
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  letterUnderline: {
    borderBottom: '4px solid black',
    width: '30px',
    textAlign: 'center',
    display: 'inline-block',
  },
  keyboard: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    justifyContent: 'center',
    marginBottom: '20px',
    color: 'black'
  },
  key: {
    width: '40px',
    height: '40px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
    color: 'black'
  },
  resetButton: {
    padding: '10px 20px',
    fontSize: '1.2rem',
    backgroundColor: '#3b82f6',
    color: 'black',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '10px',
  }
};