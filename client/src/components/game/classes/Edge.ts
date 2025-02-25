import type Vertex from './Vertex';

// To represent a weighted edge that connects 2 points in a graph
export default class Edge {
  private _vert1: Vertex;
  private _vert2: Vertex;
  private _vertRelationship: string; // what direction do you go to get from vert1 to vert2
  private _weight: number;

  constructor(vert1: Vertex, vert2: Vertex, dir: string, weight: number) {
    this._vert1 = vert1;
    this._vert2 = vert2;
    this._vertRelationship = dir;
    this._weight = weight;
  }

  // does this edge have a connection to the given vertex?
  hasConnection(v: Vertex): boolean {
    return this._vert1 === v || this._vert2 === v;
  }

  // compares this Edge's weight with the given Edge's weight,
  // returns 1 if this edge's weight is greater that the other, -1 if this weight is less than,
  // and 0 if they have the same weight
  compare(that: Edge): number {
    if (this._weight > that._weight) {
      return 1;
    }
    if (this._weight < that._weight) {
      return -1;
    }
    return 0;
  }

  // Does this edge's first vertex have the same representative as this edge's second vertex?
  sameRep(representatives: Map<Vertex, Vertex>): boolean {
    return this.findRepVert1(representatives) === this.findRepVert2(representatives);
  }

  // returns the representative of this edge's first vertex
  findRepVert1(representatives: Map<Vertex, Vertex>): Vertex {
    return this._vert1.findRep(representatives);
  }

  // returns the representative of this edge's second vertex
  findRepVert2(representatives: Map<Vertex, Vertex>): Vertex {
    return this._vert2.findRep(representatives);
  }

  // updates the edges of the two vertices with this Edge
  updateVert(): void {
    this._vert1.addEdge(this);
    let reverseDir: string;
    if (this._vertRelationship === 'down') {
      reverseDir = 'up';
    } else if (this._vertRelationship === 'up') {
      reverseDir = 'down';
    } else if (this._vertRelationship === 'left') {
      reverseDir = 'right';
    } else {
      // if (this._vertRelationship === "right")
      reverseDir = 'left';
    }
    this._vert2.addEdge(new Edge(this._vert2, this._vert1, reverseDir, this._weight));
  }

  // returns this edge's vert2, the neighbor of vert1
  neighbor(): Vertex {
    return this._vert2;
  }

  // adds this Edge's direction/relation to the given list of directions so far
  addDirection(directionsSoFar: string[]): string[] {
    directionsSoFar.push(this._vertRelationship);
    return directionsSoFar;
  }
}
