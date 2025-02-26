import React from 'react';

export default function Button({ text, handleClick, disabled }) {
  return (
    <button
      className={`f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
      onClick={!disabled ? handleClick : undefined}
      disabled={disabled}
    >
      <span className="pl1">{text}</span>
    </button>
  );
}

