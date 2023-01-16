import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch } from 'hooks/reduxHooks';
import { useEffect } from 'react';
import { setUser } from 'store/AuthSlice';
import { AppRouter } from './AppRouter';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(
      getAuth(),
      user => dispatch(setUser(user)),
      console.log
    );

    return () => {
      unsub();
    }
  }, [dispatch]);

  return <AppRouter />;
}

export { App };