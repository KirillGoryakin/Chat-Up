import { useAppSelector } from 'hooks/reduxHooks';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider
} from 'react-router-dom';
import { ChatWindow } from './ChatWindow';
import { Layout } from './Layout';
import { LoginWindow } from './LoginWindow';
import { RegisterWindow } from './RegisterWindow';

const publicRouter = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Navigate to='/login' />} />
    <Route path='/login' element={<LoginWindow />} />
    <Route path='/register' element={<RegisterWindow />} />
    <Route path='*' element={<Navigate to='/login' />} />
  </Route>
));

const privateRouter = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Navigate to='/chat' />} />
    <Route path='/chat' element={<ChatWindow />} />
    <Route path='*' element={<Navigate to='/chat' />} />
  </Route>
));

const AppRouter = () =>{
  const user = useAppSelector(store => store.auth.user);
  
  return <RouterProvider router={user ? privateRouter : publicRouter} />;
}

export { AppRouter };