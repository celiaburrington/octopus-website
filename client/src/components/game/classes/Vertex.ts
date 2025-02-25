import type Edge from './Edge';

// To represent a point in a graph
class Vertex {
  private _edges: Edge[];
  private _color: string;

  // testing constructor
  constructor(edges: Edge[] = [], color: string = 'lightgray') {
    this._edges = edges;
    this._color = color;
  }

  // EFFECT: sets this vertex's color to the given color
  setColor(c: string): void {
    this._color = c;
  }

  // gets the directions this vertex has neighbors in
  getNeighbors(): string[] {
    const dirs: string[] = [];
    for (const e of this._edges) {
      e.addDirection(dirs);
    }
    return dirs;
  }

  // adds the given edge to this Vertex's list of edges
  addEdge(edge: Edge): void {
    this._edges.push(edge);
  }

  // is this Vertex connected to the given one? aka is there an edge between the two
  isConnected(other: Vertex): boolean {
    for (const e of this._edges) {
      if (e.hasConnection(other)) {
        return true;
      }
    }
    return false;
  }

  // finds the highest level of representative in the given map of this vertex
  findRep(representatives: Map<Vertex, Vertex>): Vertex {
    if (representatives.get(this) === this) {
      return this;
    }
    return representatives.get(this)!.findRep(representatives);
  }
}

export default Vertex;
