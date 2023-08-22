import CreatePage from '../components/CreatePage/CreatePage';
import OrderPage from '../components/OrderPage/OrderPage';
import DeliverPage from '../components/DeliverPage/DeliverPage';

const routesConfig = [
  {
    path: '/',
    element: <CreatePage />,
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
  // {
  //   path: '/requests',
  //   element: <RequestsPage />,
  // },
  // {
  //   path: '*',
  //   element: <NotFoundPage />,
  // },
];

export default routesConfig;
