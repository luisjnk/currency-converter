import React from 'react';
import './Loading.css';

export function Loading() {
  return (
    <div data-testid="loading" className="loading-container">
      <div className="spinner"></div>
    </div>
  );
}
