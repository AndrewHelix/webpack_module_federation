import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
// @ts-ignore
import shopRoutes from 'shop/Router';
// @ts-ignore
import adminRoutes from 'admin/Router';

import App from '@/Components/App';

const routes = [
  {
    path: '/',
    element: <App />,
    //@ts-ignore
    children: [...shopRoutes, ...adminRoutes],
  },
];

export const router = createBrowserRouter(routes);
