import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './Components/App';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root not found!');
}

const container = createRoot(root);
container.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
    </Routes>
  </BrowserRouter>
);
