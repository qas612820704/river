import React from 'react';
import {
  Router,
  Link as ReachLink,
  navigate as reachNavigate } from '@reach/router';

// const isDevelopment = process.env.NODE_ENV === 'development';
const isDevelopment = false;

const basepath = isDevelopment ? '/' : '/river';

export function BaseRouter(props) {
  return (
    <Router basepath={basepath} {...props} />
  );
}

export function Link({ to, ...props}) {
  return (
    <ReachLink to={basepath + to} {...props} />
  )
}

export function navigate(to, ...args) {
  return reachNavigate(basepath + to, ...args);
}
