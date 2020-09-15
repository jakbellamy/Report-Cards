/* eslint-disable react/no-array-index-key */
import React, {
  lazy,
  Suspense,
  Fragment
} from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import LoadingScreen from 'src/components/LoadingScreen';
import AuthGuard from 'src/components/AuthGuard';
import GuestGuard from 'src/components/GuestGuard';

const routesConfig = [
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/home" />
  },
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/screens/Error404View'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    path: '/login-unprotected',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    path: '/app',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/app',
        component: () => <Redirect to="/app/dashboard/account-manager" />
      },
      {
        exact: true,
        path: '/app/dashboard/account-manager',
        component: lazy(() => import('src/views/dashboard/AccountManager'))
      },
      {
        exact: true,
        path: '/app/dashboard',
        component: () => <Redirect to="/app/dashboard/dashboard" />
      },
      {
        component: () => <Redirect to="/app/" />
      }
    ]
  },
  {
    path: '*',
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: '/home',
        component: () => <Redirect to='/app/' />
      },
      {
        component: () => <Redirect to="/app/" />
      }
    ]
  }
];

const renderRoutes = (routes) => (routes ? (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
) : null);

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
