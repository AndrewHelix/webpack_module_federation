import { useState } from 'react';
import * as classes from './App.module.scss';
import { Link, Outlet } from 'react-router-dom';
import { shopRoutes } from '@packages/shared/src/routes/shop';
import { adminRoutes } from '@packages/shared/src/routes/admin';

const App = () => {
  return (
    <>
      <h1 data-testid={'App'}>hello world!</h1>
      <br />
      <Link to={adminRoutes.about}>To About</Link>
      <br />
      <Link to={shopRoutes.main}>To Shop</Link>
      <Link to={shopRoutes.second}>To Shop</Link>
      <Outlet />
    </>
  );
};

export default App;
