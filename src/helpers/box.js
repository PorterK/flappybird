import isIntersect from './intersect';

export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Get a point at angle and distance relative to the current point
   * 
   * @param {number} angle - Angle in radians
   * @param {number} distance - Distance
   */
  atAngle(angle, distance) {
    let x, y;

    if (angle > Math.PI) {
      x = this.x - (distance * Math.cos(angle));
      y = this.y - (distance * Math.sin(angle));
    } else {
      x = this.x - (distance * Math.cos(angle));
      y = this.y + (distance * Math.sin(angle));
    }

    return new Point(x, y);
  }

  debug(text) {
    let box = document.getElementById(text);

    if (!box) {
      box = document.createElement('div');
    }

    box.id = text;
    box.className = 'red-border';
    box.style = `position: absolute; top: ${this.x}px; left: ${this.y}px; height: 5px; width: 5px; z-index: 9999999;`
    
    if (text) {
      box.innerText = text;
    }

    document.body.appendChild(box);
  }
}

export class Line {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }
}

export class Box {
  constructor(top, right, bottom, left) {
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
  }

  intersects(box2) {
    return isIntersect(this.top, box2.bottom) ||
      isIntersect(this.bottom, box2.top) ||
      isIntersect(this.right, box2.left) ||
      isIntersect(this.bottom, box2.top)
  }

  debug(id) {
    const points = [this.top.p1, this.top.p2, this.bottom.p2, this.bottom.p1];

    points.forEach((p, index) => {
      let box = document.getElementById(`${id}-${index}`);

      if (!box) {
        box = document.createElement('div');
      }

      box.id = `${id}-${index}`;
      box.style = `position: absolute; top: ${p.x}px; left: ${p.y}px; height: 5px; width: 5px; background: red; z-index: 9999999;`

      document.body.appendChild(box);
    });
  }
}
