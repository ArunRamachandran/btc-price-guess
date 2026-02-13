import { Navigate, Outlet } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';

export const ProtectedRoute = () => {
  const userName = useGameStore((state) => state.userName);

  // if no username exists, redirect to onboarding page
  if (!userName) {
    return <Navigate to="/" replace/>;
  }

  // if username exists, navigate the users to the guess page
  return <Outlet />;

}