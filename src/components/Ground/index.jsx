import React from 'react';

import './style.css';

export default function Ground({ moving }) {
  return (
    <div id="ground" className="ground">
      <div className={`stripes ${moving && 'stripes_moving'}`} />
    </div>
  )
}