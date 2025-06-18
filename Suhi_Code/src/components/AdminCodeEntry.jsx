import React, { useState, useRef, useEffect } from 'react';
import './AdminCodeEntry.css';

const AdminCodeEntry = ({ onCodeCorrect }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError(false);

    // Move to next input if value is entered
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all digits are entered
    if (newCode.every(digit => digit !== '')) {
      const enteredCode = newCode.join('');
      if (enteredCode === '1234') {
        onCodeCorrect();
      } else {
        // Show error animation
        setError(true);
        // Reset code after a short delay
        setTimeout(() => {
          setCode(['', '', '', '']);
          inputRefs.current[0]?.focus();
        }, 1000);
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="admin-code-entry">
      <h2>Enter Admin Code</h2>
      <div className="code-inputs">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={el => inputRefs.current[index] = el}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`code-input ${error ? 'error' : ''}`}
            inputMode="numeric"
            pattern="[0-9]*"
          />
        ))}
      </div>
    </div>
  );
};

export default AdminCodeEntry; 