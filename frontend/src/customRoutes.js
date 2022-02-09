import React from 'react';
import { RouteWithoutLayout } from 'react-admin';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import EventPage from './pages/EventPage';

export default [
  <RouteWithoutLayout exact path="/" component={HomePage} />,
  <RouteWithoutLayout exact path="/u/:id" component={UserPage} />,
  <RouteWithoutLayout exact path="/e/:id" component={EventPage} />,
];
