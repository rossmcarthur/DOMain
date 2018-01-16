class Coord {
  constructor(x, y) {
      this.x = x;
      this.y = y;
  }

  plus(coord2) {
    const newCoords = (this.x + coord2.x, this.y + coord2.y);
    return newCoords;

  }

  equals(coord2) {
    return (this.x === coord2.x) && (this.y === coord2.y);
  }

  isOpposite(coord2) {
    return ((-(this.x) == (coord2.x)) && (-(this.y) == (coord2.y)));
  }
}

export default Coord;
