import { SHIP_SIZES, ShipSizeType } from "../constants/ship";

interface Position {
  x: number;
  y: number;
}

class Ship {
  id: string;
  position: Position;
  direction: boolean;
  length: number;
  type: ShipSizeType;
  hits: number;

  constructor(
    position: Position,
    direction: boolean,
    type: ShipSizeType,
    length: number
  ) {
    this.id = crypto.randomUUID();
    this.position = position;
    this.direction = direction;
    this.type = type;
    this.length = length;
    this.hits = 0;
  }

  isHit(x: number, y: number): boolean {
    if (this.direction) {
      return (
        y === this.position.y &&
        x >= this.position.x &&
        x < this.position.x + this.length
      );
    } else {
      return (
        x === this.position.x &&
        y >= this.position.y &&
        y < this.position.y + this.length
      );
    }
  }

  hit(): void {
    this.hits++;
  }

  isSunk(): boolean {
    return this.hits === this.length;
  }

  getOccupiedCells(): Position[] {
    const cells: Position[] = [];
    for (let i = 0; i < this.length; i++) {
      if (this.direction) {
        cells.push({ x: this.position.x + i, y: this.position.y });
      } else {
        cells.push({ x: this.position.x, y: this.position.y + i });
      }
    }
    return cells;
  }
}

export default Ship;
