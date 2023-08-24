import { Route, Routes } from 'react-router-dom';
import routesConfig from '../../routes/routesConfig';
import Header from '../Header/Header';
import './App.css';

function App() {
  document.title = 'Deliver Flow';

  return (
    <>
      <Header />
      <Routes>
        {
          routesConfig.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          ))
        }

      </Routes>

    </>
  );
}

export default App;
