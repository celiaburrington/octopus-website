import { Navigate, Route, Routes } from 'react-router-dom';
import LoginContext from '../contexts/LoginContext';
import useOctopusWebsite from '../hooks/useOctopusWebsite';
import { OctoSiteSocket, User } from '../types';
import UserContext from '../contexts/UserContext';
import Layout from './layout';
import Login from './login';
import Attribution from './attribution';
import MainPage from './main';

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
      <Layout />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Navigate to='home' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<MainPage />} />
        <Route path='/how-to-help' element={<div>Help!!</div>} />
        <Route path='/octopus-facts' element={<div>Octoids</div>} />
        <Route path='/game' element={<div>Game!!</div>} />
        <Route path='/attribution' element={<Attribution />} />

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
