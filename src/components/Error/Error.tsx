import React from 'react';
import './Error.css';

interface ErrorProps {
  message: string;
}

export function Error({ message }: ErrorProps) {
  return (
    <div className="error-container">
      <p className="error-message light-pink-text">{message}</p>
    </div>
  );
};