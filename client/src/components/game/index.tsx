import './index.css';
import MazeCanvas from './MazeCanvas';

const Game = () => (
  <div className='os-game-page'>
    <div className='os-game-title'>Octopus Escape</div>
    <div className='os-maze'>
      <MazeCanvas />
    </div>
  </div>
);

export default Game;
