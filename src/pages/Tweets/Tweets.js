import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchUsers } from "../../api/api";
import { UserItem } from "../../components/UserItem/UserItem";
import { Loader } from "../../components/Loader/Loader";
import Back from "../../components/Back/Back";
import { Filter } from "../../components/Filter/Filter";
  import css from "./Tweets.module.css";


const usersPerPage = 3;

const Tweets = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    try {
      const getUsers = async () => {
        const { data } = await fetchUsers();
        if (!data.length) {
          setIsLoading(false);
          toast.error('Sorry there are no users matching your search query. Please try again.', {
            theme: 'colored',
          });
          return;
        }
        setUsers(data);
        setIsLoading(false);
      };
      getUsers();
    } catch (e) {
      console.log(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const storedFilter = localStorage.getItem('filter');
    if (storedFilter) {
      setFilter(storedFilter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const updatedFilteredUsers = users.map((user) => ({
      ...user,
      isFollowing: localStorage.getItem(`followStatus-${user.id}`)
        ? JSON.parse(localStorage.getItem(`followStatus-${user.id}`))
        : user.isFollowing || false,
    })).filter((user) => {
      if (filter === 'follow') {
        return !user.isFollowing;
      } else if (filter === 'following') {
        return user.isFollowing;
      }
      return true;
    });
    localStorage.setItem('filter', filter);
    setFilteredUsers(updatedFilteredUsers);
  }, [users, filter]);

  useEffect(() => {
    const resetFilter = () => {
      setFilter('all');
      localStorage.removeItem('filter');
    };
    return resetFilter;
  }, []);

  const onLoadMoreClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    console.log(filter);
  };

  return (
    <>
      <Back />
      <Filter filterOption={filter} onChange={handleFilterChange} />
      {isLoading && <Loader />}
      <ul className={css.userList}>
        {filteredUsers.slice(0, page * usersPerPage).map(({ id, user, tweets, followers, avatar, isFollowing }) => (
          <UserItem
            key={id}
            id={id}
            user={user}
            tweets={tweets}
            followers={followers}
            avatar={avatar}
            isFollowing={isFollowing}
          />
        ))}
      </ul>
      {filteredUsers.length > page * usersPerPage && (
        <button type="button" onClick={onLoadMoreClick}>Load more</button>
      )}
      <ToastContainer autoClose={3000} limit={1} />
    </>
  );
};

export default Tweets;