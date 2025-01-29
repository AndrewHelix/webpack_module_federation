import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { AboutLazy } from '@/pages/about/About.lazy';
import App from '@/Components/App';
import { adminRoutes } from '@packages/shared/src/routes/admin';

const routes = [
  {
    path: '/admin',
    element: <App />,
    children: [
      {
        path: adminRoutes.about,
        element: (
          <Suspense fallback={<div>...Loading</div>}>
            <AboutLazy />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
