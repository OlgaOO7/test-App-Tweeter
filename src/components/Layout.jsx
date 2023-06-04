import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Loader } from '../components/Loader/Loader';

const Layout = () => {
  return (
    <>
      <header>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/tweets">Tweets</NavLink>
          </li>
        </ul>
      </header>

      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>

      <footer></footer>
    </>
  );
};

export default Layout;
