/* eslint-disable @typescript-eslint/naming-convention */
import Edge from './Edge';
import Vertex from './Vertex';

enum Key {
  up,
  down,
  left,
  right,
}

// to represent a maze
class MazeWorld {
  private width: number = 5; // # maze cells/vertices in a row
  private height: number = 5; // # maze cells/vertices in a column
  private SCREENWIDTH = 800; // # maze cells/vertices in a row
  private SCREENHEIGHT = 500; // # maze cells/vertices in a column

  private vertices: Vertex[][] = [];
  // used to generate our maze with Kruskal's Algorithm,
  // maps one vertex's reference to another reference
  private references: Map<Vertex, Vertex> = new Map();
  private mode: string = 'start';
  // for manual traversal
  public x: number = 0;
  public y: number = 0;

  // constructor
  // creates a new MazeWorld with the given dimensions
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.references = new Map<Vertex, Vertex>();
    this.generateNewMaze();
  }

  // handle's this world's key events
  onKeyEvent(key: string): MazeWorld {
    if (key === 'ArrowDown' || key === 's') {
      this.move(Key.down);
    } else if (key === 'ArrowUp' || key === 'w') {
      this.move(Key.up);
    } else if (key === 'ArrowRight' || key === 'd') {
      this.move(Key.right);
    } else if (key === 'ArrowLeft' || key === 'a') {
      this.move(Key.left);
    } else if (key === 'g') {
      this.generateNewMaze();
    } else if (key === 'c') {
      this.clearMaze();
    }
    return this;
  }

  // handles movement key events if this world's mode is manual. Deals with arrow
  // key inputs
  move(key: Key) {
    this.vertices[this.y][this.x].setColor('cyan');
    // if not already at the bottom, move down
    if (
      this.y < this.height - 1 &&
      key === Key.down &&
      this.vertices[this.y][this.x].isConnected(this.vertices[this.y + 1][this.x])
    ) {
      this.y += 1;
    }
    // if not already at the top, move up
    else if (
      this.y > 0 &&
      key === Key.up &&
      this.vertices[this.y][this.x].isConnected(this.vertices[this.y - 1][this.x])
    ) {
      this.y -= 1;
    }
    // if not already at the left edge, move left
    else if (
      this.x > 0 &&
      key === Key.left &&
      this.vertices[this.y][this.x].isConnected(this.vertices[this.y][this.x - 1])
    ) {
      this.x -= 1;
    }
    // if not already at the right edge, move right
    else if (
      this.x < this.width - 1 &&
      key === Key.right &&
      this.vertices[this.y][this.x].isConnected(this.vertices[this.y][this.x + 1])
    ) {
      this.x += 1;
    }
    this.vertices[this.y][this.x].setColor('blue');

    // if the user has finished traversing the maze, display the correct path
    if (this.vertices[this.y][this.x] === this.vertices[this.height - 1][this.width - 1]) {
      // resets to start mode so that the user can't keep moving
      this.mode = 'start';
    }
  }

  // EFFECT: resets the maze to its initial state
  // used to generate a new random maze
  generateNewMaze(): void {
    this.x = 0;
    this.y = 0;
    this.mode = 'start';
    this.vertices = [];
    this.genVertices();
    this.createST(this.genEdges());
  }

  // generates an inital array list of edges connecting each vertex to its direct
  // neighbors
  // in the four cardinal directions. To avoid excessive duplicate edges, only add
  // a right
  // and down edge for the vertices that have them.
  genEdges(): Edge[] {
    const accEdges: Edge[] = [];
    // adds each vertex's right and down edge, adds just the right or down edge
    // for vertices on the right/bottom sides
    for (let y = 0; y < this.vertices.length; y += 1) {
      for (let x = 0; x < this.vertices[0].length; x += 1) {
        const vert1: Vertex = this.vertices[y][x];
        // if NOT on right edge:
        if (x !== this.vertices[0].length - 1) {
          const vertRight: Vertex = this.vertices[y][x + 1];
          const randWeight = Math.floor(Math.random() * this.width * this.height * 2);
          accEdges.push(new Edge(vert1, vertRight, 'right', randWeight));
        }
        // if NOT on the bottom edge:
        if (y !== this.vertices.length - 1) {
          const vertDown: Vertex = this.vertices[y + 1][x];
          const randWeight = Math.floor(Math.random() * this.width * this.height * 2);
          accEdges.push(new Edge(vert1, vertDown, 'down', randWeight));
        }
        // implicit else: x and y are on the bottom/right edges respectively so no edges
        // to add
      }
    }
    return accEdges;
  }

  // generates an initial grid of vertices, updating this MazeWorld's hashmap with
  // each new vertex
  // representing itself, from which to build up an initial worklist of edge
  // connections
  genVertices(): Vertex[][] {
    // ArrayList<ArrayList<Vertex>> vertexGrid = this.vertices;
    // builds a grid (2D array list) of new vertices with empty array list's of
    // edges
    for (let y = 0; y < this.height; y += 1) {
      const vertexRow: Vertex[] = [];
      // build a row of empty vertices to add to the grid
      for (let x = 0; x < this.width; x += 1) {
        const v: Vertex = new Vertex();
        vertexRow.push(v);
      }
      this.vertices.push(vertexRow);
    }
    // sets the start and end maze cell's colors
    this.vertices[0][0].setColor('green');
    this.vertices[this.height - 1][this.width - 1].setColor('magenta');
    // sets the new vertices's representatives to themselves
    this.mapVertexToSelf();
    return this.vertices;
  }

  // EFFECT: maps every vertex to itself
  // used for the base case vertex, which is referenced by itself
  mapVertexToSelf(): void {
    for (const vertList of this.vertices) {
      for (const v of vertList) {
        this.references.set(v, v);
      }
    }
  }

  // resets the color of this maze's vertices to default grey
  clearMaze(): void {
    for (const vertList of this.vertices) {
      for (const v of vertList) {
        v.setColor('lightgrey');
      }
      // resets position in maze
      this.x = 0;
      this.y = 0;
    }
    // sets the start and end maze cell's colors
    this.vertices[0][0].setColor('green');
    this.vertices[this.height - 1][this.width - 1].setColor('magenta');
  }

  // sorts edges by edge weight from smallest to largest
  sortEdges(edges: Edge[]): void {
    edges.sort((e1, e2) => e1.compare(e2));
  }

  // creates a spanning tree
  createST(worklist: Edge[]): Edge[] {
    this.sortEdges(worklist);
    const treeEdges: Edge[] = [];
    while (worklist.length > 0) {
      const curEdge = worklist.pop() as Edge;
      // if edge vertices aren't already connected:
      if (!curEdge.sameRep(this.references)) {
        // connect the vertices w/ references
        this.unionRep(curEdge);
        treeEdges.push(curEdge);
        curEdge.updateVert();
      }
    }
    return treeEdges;
  }

  // sets the value of one representative to the other's representative
  unionRep(edge: Edge): void {
    this.references.set(edge.findRepVert1(this.references), edge.findRepVert2(this.references));
  }

  // draws this world's maze
  toGrid(): number[][] {
    const gridHeight = this.height * 2 - 1;
    const gridWidth = this.width * 2 - 1;
    const grid: number[][] = new Array(gridHeight);
    for (let i = 0; i < gridHeight; i += 1) {
      const row = new Array(gridWidth).fill(1);
      grid[i] = row;
    }

    for (let y = 0; y < this.vertices.length; y += 1) {
      for (let x = 0; x < this.vertices[0].length; x += 1) {
        const currVert = this.vertices[y][x];
        const neighbors = currVert.getNeighbors();
        grid[y * 2][x * 2] = 0;
        for (const n of neighbors) {
          if (n === 'up') {
            grid[y * 2 - 1][x * 2] = 0;
          } else if (n === 'down') {
            grid[y * 2 + 1][x * 2] = 0;
          } else if (n === 'left') {
            grid[y * 2][x * 2 - 1] = 0;
          } else if (n === 'right') {
            grid[y * 2][x * 2 + 1] = 0;
          }
        }
      }
    }

    return grid;
  }
}

export default MazeWorld;
