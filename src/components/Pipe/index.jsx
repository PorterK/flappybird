import React from 'react';

import './style.css';

export default function Pipe() {
  return (
    <div class="pipe-container">
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