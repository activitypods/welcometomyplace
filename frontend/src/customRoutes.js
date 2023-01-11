import React from 'react';
import { RouteWithoutLayout } from 'react-admin';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import EventPage from './pages/EventPage';
import OffersPage from './pages/OffersPage';
import RequestsPage from './pages/RequestsPage';
import SettingsPage from './pages/SettingsPage';
import { Route } from "react-router-dom";
import RedirectPage from "./pages/RedirectPage";

export default [
  <RouteWithoutLayout exact path="/" component={HomePage} />,
  <RouteWithoutLayout exact path="/r" component={RedirectPage} />,
  <RouteWithoutLayout exact path="/u/:id" component={UserPage} />,
  <RouteWithoutLayout exact path="/e/:id" component={EventPage} />,
  <RouteWithoutLayout exact path="/offers/:id" component={OffersPage} />,
  <RouteWithoutLayout exact path="/requests/:id" component={RequestsPage} />,
  <Route exact path="/account/settings" component={SettingsPage} />,
];
