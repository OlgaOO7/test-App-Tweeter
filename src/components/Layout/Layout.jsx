import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import css from "./Layout.module.css";

const Layout = () => {
  return (
    <>
      <header className={css.header}>
        <ul className={css.navLinkList}>
          <li>
            <NavLink to="/" className={css.navLink}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/tweets" className={css.navLink}>Tweets</NavLink>
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
