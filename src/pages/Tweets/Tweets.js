import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchUsers } from "../../api/api";
import { UserItem } from "../../components/UserItem/UserItem";
import { Loader } from "../../components/Loader/Loader";
import Back from "../../components/Back/Back";

const usersPerPage = 3;

const Tweets = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      const getUsers = async () => {
        const { data } = await fetchUsers();
        console.log(data);
        if (!data.length) {
          setIsLoading(false);
          toast.error(
            'Sorry there are no users matching your search query. Please try again.',
            {
              theme: 'colored',
            }
          );
          return;
        }
        setUsers(data);
        console.log('users:', users);
        setIsLoading(false);
      }
      getUsers();
    } catch (e) {
      console.log(e);
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  }


  return (
    <>
      <Back />
      {isLoading && <Loader />}
      <ul>
        {users.slice(0, page * usersPerPage).map(({ id, user, tweets, followers, avatar }) => {
          return (
            <UserItem key={id} id={id} user={user} tweets={tweets} followers={followers} avatar={avatar} />
          )
        })}
      </ul>
      {users.length > page * usersPerPage && (
        <button type='button' onClick={onLoadMoreClick}>Loading more</button>
      )}
      <ToastContainer autoClose={3000} limit={1} />
    </>
  )
};

export default Tweets;