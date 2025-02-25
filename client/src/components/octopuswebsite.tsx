import { Navigate, Route, Routes } from 'react-router-dom';
import LoginContext from '../contexts/LoginContext';
import useOctopusWebsite from '../hooks/useOctopusWebsite';
import { OctoSiteSocket, User } from '../types';
import UserContext from '../contexts/UserContext';
import Layout from './layout';
import Attribution from './attribution';
import MainPage from './main';
import HowToHelp from './HowToHelp/HowToHelp';
import Octoids from './octoids';
import Game from './game';

const ProtectedRoute = ({
  user,
  socket,
  children,
}: {
  user: User | null;
  socket: OctoSiteSocket | null;
  children: JSX.Element;
}) => {
  if (!user || !socket) {
    return <Navigate to='login' />;
  }

  return <UserContext.Provider value={{ user, socket }}>{children}</UserContext.Provider>;
};

const OctopusWebsite = ({ socket }: { socket: OctoSiteSocket | null }) => {
  const { user, setUser } = useOctopusWebsite(socket);

  return (
    <LoginContext.Provider value={{ setUser }}>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Navigate to='home' />} />
        <Route path='/home' element={<MainPage />} />
        <Route element={<Layout />}>
          <Route path='/login' element={<h1>Currently in Developememt!</h1>} />
          <Route path='/how-to-help' element={<HowToHelp />} />
          <Route path='/octopus-facts' element={<Octoids />} />
          <Route path='/game' element={<Game />} />
          <Route path='/attribution' element={<Attribution />} />
        </Route>

        {/* Protected Routes */}
        {
          <Route
            element={
              <ProtectedRoute user={user} socket={socket}>
                <Layout />
              </ProtectedRoute>
            }>
            <Route path='/octoblog' element={<div>Octoblog connect!</div>} />
          </Route>
        }
      </Routes>
    </LoginContext.Provider>
  );
};

export default OctopusWebsite;
