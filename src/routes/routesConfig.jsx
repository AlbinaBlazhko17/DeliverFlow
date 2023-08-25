import SelectTypePage from '../components/SelectTypePage/SelectTypePage';
import RequestFormPage from '../components/RequestFormPage/RequestFormPage';
import RequestsPage from '../components/RequestsPage/RequestsPage';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';

const routesConfig = [
  {
    path: '/',
    element: <SelectTypePage />,
  },
  {
    path: '/create',
    element: <SelectTypePage />,
  },
  {
    path: '/create/order',
    element: <RequestFormPage typeOfRequest="order" />,
  },
  {
    path: '/create/deliver',
    element: <RequestFormPage typeOfRequest="delivery" />,
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
