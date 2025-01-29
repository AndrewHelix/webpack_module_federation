import { useState } from 'react';
import * as classes from './App.module.scss';
import { Link, Outlet } from 'react-router-dom';
import Twitter from '@/assets/twitter.png';
import Flowers from '@/assets/flowers.jpg';
import HatIcon from '@/assets/hat-chef-svgrepo-com.svg';

const App = () => {
  return (
    <>
      <h1 data-testid={'App'}>SHOP MODULE!</h1>
      <Outlet />
    </>
  );
};

export default App;
