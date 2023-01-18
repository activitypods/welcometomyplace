import React from 'react';
import { RouteWithoutLayout } from 'react-admin';
import HomePage from './pages/HomePage';
import RedirectPage from "./pages/RedirectPage";

export default [
  <RouteWithoutLayout exact path="/" component={HomePage} />,
  <RouteWithoutLayout exact path="/r" component={RedirectPage} />,
];
