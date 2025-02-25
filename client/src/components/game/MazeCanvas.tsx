import React, { useRef, useEffect, useState } from 'react';
import MazeWorld from './classes/MazeWorld';

const MazeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [world, setWorld] = useState<MazeWorld>(new MazeWorld(20, 10));
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: world.x, y: world.y });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // const grid: number[][] = [
    //   [1, 0, 1, 1, 0],
    //   [0, 0, 0, 1, 0],
    //   [1, 0, 0, 0, 1],
    //   [0, 1, 1, 0, 0],
    //   [0, 0, 0, 0, 0],
    // ]; // Example maze grid (0 = path, 1 = wall)
    const grid = world.toGrid();

    const cellSize = 20;

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === 0) {
          ctx.fillStyle = 'lightgray';
        } else {
          ctx.fillStyle = 'black';
        }
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, cellSize, cellSize);
    ctx.fillStyle = 'purple';
    ctx.fillRect((grid[0].length - 1) * cellSize, (grid.length - 1) * cellSize, cellSize, cellSize);
    ctx.fillStyle = 'blue';
    ctx.fillRect(world.x * 2 * cellSize, world.y * 2 * cellSize, cellSize, cellSize);
  }, [position, world]);

  useEffect(() => {
    // Function to handle keyboard input
    const handleKeyDown = (event: KeyboardEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const cellSize = 20;
      ctx.fillStyle = 'cyan';
      ctx.fillRect(world.x * 2 * cellSize, world.y * 2 * cellSize, cellSize, cellSize);
      const newWorld = world.onKeyEvent(event.key);
      const newPos = { x: newWorld.x, y: newWorld.y };
      setPosition(newPos);
      setWorld(newWorld);
    };

    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position, world]);

  return <canvas ref={canvasRef} width={1000} height={430}></canvas>;
};

export default MazeCanvas;
