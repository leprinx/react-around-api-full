import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, isLoggedIn }) {
  return (
    isLoggedIn ? children : <Navigate replace to='/signin' />
  );
}

export default ProtectedRoute;
