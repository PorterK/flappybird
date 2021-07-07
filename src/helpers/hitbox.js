export const getBirdHitbox = (debug = false) => {
  const elem = document.getElementById('bird');

  const pos = elem.getBoundingClientRect();

  const matrix = window.getComputedStyle(elem)
    .getPropertyValue('transform')
    ?.split('(')[1]
    ?.split(')')[0]
    ?.split(',');
    
  const angle = matrix && Math.round(Math.atan2(matrix[1], matrix[0]) * (180/Math.PI));

  const border = { top: pos.top + 25, bottom: pos.bottom + 75, left: pos.left + 10, right: pos.right + 55 };

  if (angle === -22) {
    border.top = pos.top + 10;
    border.left = pos.left + 25;
    border.right = pos.right + 65;
    border.bottom = pos.bottom + 50; 
  }

  if (angle > 75) {
    border.left = pos.left - 50;
    border.right = pos.right - 15;
  }

  if (debug) {
    const hitbox = document.createElement('div');

    hitbox.className = 'red-border';
    hitbox.style = `position: absolute; top: ${border.top}px; left: ${border.left}px; height: ${border.bottom - border.top}px; width: ${border.right - border.left}px; z-index: 9999999;`

    document.body.appendChild(hitbox);
  }

  return border;
}

export const getFloorHitbox = () => {
  const elem = document.getElementById('ground');

  const { top, bottom, left, right } = elem.getBoundingClientRect();

  return { top, bottom, left, right };
}

export const getPipeHitbox = (pipe, debug = false) => {
  const { top, bottom, left, right } = pipe.getBoundingClientRect();

  if (debug) {
    const hitbox = document.createElement('div');

    hitbox.className = 'red-border';
    hitbox.style = `position: absolute; top: ${top + 10}px; left: ${left}px; height: ${bottom - top}px; width: ${right - left}px; z-index: 9999999;`

    document.body.appendChild(hitbox);
  }

  return { top: top + 10, bottom, left, right };
}
