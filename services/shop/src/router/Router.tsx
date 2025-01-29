import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { ShopLazy } from '@/pages/shop/Shop.lazy';
import App from '@/Components/App';
import { shopRoutes } from '@packages/shared/src/routes/shop';
import { UserCard } from '@packages/shared/src/components/UserCard';

const routes = [
  {
    path: '/shop',
    element: <App />,
    children: [
      {
        path: shopRoutes.main,
        element: (
          <Suspense fallback={<div>...Loading</div>}>
            <ShopLazy />
          </Suspense>
        ),
      },
      {
        path: shopRoutes.second,
        element: (
          <Suspense fallback={<div>...Loading</div>}>
            <div>
              <UserCard />
            </div>
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
