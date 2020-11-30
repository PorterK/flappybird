import React from 'react';

import './style.css';

const position = Math.floor(Math.random() * 40) + 20;

export default function Pipe() {
  return (
    <div class="pipe-container" style={{ marginTop: `calc(-${position}vh - 175px)` }}>
      <div className="pipe">
        <div className="pipe-gradient pipe-body" data-position="top" />
        <div className="pipe-gradient pipe-end" />
      </div>
      <div className="pipe">
        <div className="pipe-gradient pipe-end" />
        <div className="pipe-gradient pipe-body"  data-position="bottom" />
      </div>
    </div>
  )
}