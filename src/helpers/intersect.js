/**
 * Code from this StackOverflow answer: https://stackoverflow.com/a/30160064
 */

function RotationDirection(p1x, p1y, p2x, p2y, p3x, p3y) {
  if (((p3y - p1y) * (p2x - p1x)) > ((p2y - p1y) * (p3x - p1x)))
    return 1;
  else if (((p3y - p1y) * (p2x - p1x)) == ((p2y - p1y) * (p3x - p1x)))
    return 0;
  
  return -1;
}

function containsSegment(x1, y1, x2, y2, sx, sy) {
  if (x1 < x2 && x1 < sx && sx < x2) return true;
  else if (x2 < x1 && x2 < sx && sx < x1) return true;
  else if (y1 < y2 && y1 < sy && sy < y2) return true;
  else if (y2 < y1 && y2 < sy && sy < y1) return true;
  else if (x1 == sx && y1 == sy || x2 == sx && y2 == sy) return true;
  return false;
}

export default function isIntersection(
    {
      p1: { x: x1, y: y1 },
      p2: { x: x2, y: y2 },
    },
    {
      p1: { x: x3, y: y3 },
      p2: { x: x4, y: y4 },
    }
  ) {
  var f1 = RotationDirection(x1, y1, x2, y2, x4, y4);
  var f2 = RotationDirection(x1, y1, x2, y2, x3, y3);
  var f3 = RotationDirection(x1, y1, x3, y3, x4, y4);
  var f4 = RotationDirection(x2, y2, x3, y3, x4, y4);
  
  // If the faces rotate opposite directions, they intersect.
  var intersect = f1 != f2 && f3 != f4;
  
  // If the segments are on the same line, we have to check for overlap.
  if (f1 == 0 && f2 == 0 && f3 == 0 && f4 == 0) {
    intersect = containsSegment(x1, y1, x2, y2, x3, y3) || containsSegment(x1, y1, x2, y2, x4, y4) ||
    containsSegment(x3, y3, x4, y4, x1, y1) || containsSegment(x3, y3, x4, y4, x2, y2);
  }
  
  return intersect;
}