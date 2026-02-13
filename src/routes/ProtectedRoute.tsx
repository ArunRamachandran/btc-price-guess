import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const userName = "";

  // if no username exists, redirect to onboarding page
  if (!userName) {
    return <Navigate to="/" replace/>;
  }

  // if username exists, navigate the users to the guess page
  return <Outlet />;

}