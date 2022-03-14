import { Point, Line, Box } from './box';

export const getBirdHitbox = (debug = false) => {
  const elem = document.getElementById('bird');

  const pos = elem.getBoundingClientRect();

  const matrix = window.getComputedStyle(elem)
    .getPropertyValue('transform')
    ?.split('(')[1]
    ?.split(')')[0]
    ?.split(',');

  if (!matrix) return;
    
  const angleRad = Math.atan2(matrix[1], matrix[0]);

  const normalizedRadians = angleRad + (Math.PI / 2);

  const angleDeg = Math.round(normalizedRadians * (180 / Math.PI));

  // The math below this point is sketchy but good enough
  let xMod = 20;
  let yMod = 13;

  if (angleDeg > 45 && angleRad > 0) {
    xMod = 30;
    yMod = -20;
  }

  const topLeft = new Point(pos.top + xMod, pos.left + yMod);
  const topRight = topLeft.atAngle(normalizedRadians, 55);

  const bottomRight = new Point(topLeft.x + 35, topLeft.y);
  const bottomLeft = bottomRight.atAngle(normalizedRadians, 55);

  const top = new Line(topLeft, topRight);
  const right = new Line(topRight, bottomRight);
  const bottom = new Line(bottomRight, bottomLeft);
  const left = new Line(bottomLeft, topLeft);


  return new Box(top, right, bottom, left);
}

export const getFloorHitbox = () => {
  const elem = document.getElementById('ground');

  const { top, bottom, left, right } = elem.getBoundingClientRect();

  const topLeft = new Point(left, top);
  const topRight = new Point(right, top);
  const bottomLeft = new Point(left, bottom);
  const bottomRight = new Point(right, bottom);

  const topLine = new Line(topLeft, topRight);
  const rightLine = new Line(topRight, bottomRight);
  const bottomLine = new Line(bottomRight, bottomLeft);
  const leftLine = new Line(bottomLeft, topLeft);

  return new Box(topLine, rightLine, bottomLine, leftLine);
}

export const getPipeHitbox = (pipe) => {
  const { top, bottom, left, right } = pipe.getBoundingClientRect();

  const topLeft = new Point(top + 10, left);
  const topRight = new Point(top + 10, right);
  const bottomLeft = new Point(bottom, left);
  const bottomRight = new Point(bottom, right);

  const topLine = new Line(topLeft, topRight);
  const rightLine = new Line(topRight, bottomRight);
  const bottomLine = new Line(bottomRight, bottomLeft);
  const leftLine = new Line(bottomLeft, topLeft);

  return new Box(topLine, rightLine, bottomLine, leftLine);
}
