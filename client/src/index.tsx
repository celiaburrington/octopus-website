import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { OctoSiteSocket } from './types';
import OctopusWebsite from './components/octopuswebsite';

const container = document.getElementById('root');

const App = () => {
  const [socket, setSocket] = useState<OctoSiteSocket | null>(null);

  const serverURL = process.env.REACT_APP_SERVER_URL;

  // if (serverURL === undefined) {
  //   throw new Error("Environment variable 'OCTOPUS_APP_SERVER_URL' must be defined");
  // }

  useEffect(() => {
    if (!socket) {
      setSocket(io(serverURL));
    }

    return () => {
      if (socket !== null) {
        socket.disconnect();
      }
    };
  }, [socket, serverURL]);

  return (
    <Router>
      <OctopusWebsite socket={socket} />
    </Router>
  );
};

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}
