import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import './App.css';
import routesConfig from '../../routes/routesConfig';

function App() {
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
