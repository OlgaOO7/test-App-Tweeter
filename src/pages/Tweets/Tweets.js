import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { UsersList } from "../../components/UsersList/UsersList";

const Tweets = () => {

  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');
  return (
    <>
      <Link to={backLinkLocationRef.current}>
        <ArrowLeftIcon />
        Back
      </Link>
      <UsersList />
    </>

  )
};

export default Tweets;