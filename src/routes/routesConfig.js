import CreatePage from '../components/CreatePage/CreatePage';

const routesConfig = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/create',
    element: <CreatePage />,
  },
  {
    path: '/create/order',
    element: <OrderPage />,
  },
  {
    path: '/create/deliver',
    element: <DeliverPage />,
  },
  {
    path: '/requests',
    element: <RequestsPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routesConfig;
