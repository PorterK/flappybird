// Accepts 2 boxes, a box looks like:
// { x, y, width, height }
const intersect = (b1, b2) => {
  return b1.top <= b2.bottom && b1.bottom >= b2.top && b1.left <= b2.right && b1.right >= b2.left;
}

export default intersect;