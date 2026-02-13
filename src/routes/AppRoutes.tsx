import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute'
import { OnBoarding } from '../pages/OnBoarding';
import { useGameStore } from '../store/useGameStore';

export const AppRoutes = () => {
  const userName = useGameStore((state) => state.userName);

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/guess" element={<div>GuessPage</div>} />
      </Route>
      <Route 
        path="/" 
        element={userName ? <Navigate to="/guess" replace /> : <OnBoarding />} 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}