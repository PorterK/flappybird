import React from 'react';

import './style.css';

export default function Pipe({ id, position }) {
  return (
    <div id={id} className="pipe-container" style={{ marginTop: `calc(-${position}vh - 175px)` }}>
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