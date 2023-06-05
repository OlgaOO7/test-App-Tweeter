import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

const Back = () => {
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');

  return (
    <Link to={backLinkLocationRef.current}>
      <ArrowLeftIcon />
      Back
    </Link>
  );
};

export default Back;
