// src/hooks/useAuth.js
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser, selectToken, selectIsLoggedIn } from '../store/authslice';
import { loginUser, registerUser } from '../services/authService';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user      = useSelector(selectUser);
  const token     = useSelector(selectToken);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleLogin = async (email, password) => {
    const data = await loginUser({ email, password });
    dispatch(login(data)); // data = { token, id, email, firstName, lastName, role }
    return data;
  };

  const handleRegister = async (email, password, firstName, lastName) => {
    const data = await registerUser({ email, password, firstName, lastName });
    dispatch(login(data));
    return data;
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    token,
    isLoggedIn,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
