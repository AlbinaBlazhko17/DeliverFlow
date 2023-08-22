import { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import routesConfig from '../../routes/routesConfig';
import Header from '../Header/Header';
import './App.css';

function App() {
  const [id, setId] = useState(0);
  return (
    <>
      <Header />
      <Routes>
        <Route
          element={(
            <Outlet
              context={{ id, setId }}
            />
            )}
        >
          {
          routesConfig.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          ))
        }
        </Route>
      </Routes>
      <Outlet context={{ hello: 'world' }} />
    </>
  );
}

export default App;
