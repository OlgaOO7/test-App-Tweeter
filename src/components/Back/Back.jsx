import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import css from './Back.module.css';

const Back = () => {
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');

  return (
    <Link to={backLinkLocationRef.current} className={css.navLinkBack}>
      <ArrowLeftIcon className={css.arrowIcon} />
      Back
    </Link>
  );
};

export default Back;
