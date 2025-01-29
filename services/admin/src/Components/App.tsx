import { useState } from 'react';
import * as classes from './App.module.scss';
import { Link, Outlet } from 'react-router-dom';
import { deepMerge } from '@packages/shared/src/utils/deepMerge';

const App = () => {
  deepMerge();
  return (
    <>
      <h1 data-testid={'App'}>ADMIN MODULE!</h1>
      <Outlet />
    </>
  );
};

export default App;
