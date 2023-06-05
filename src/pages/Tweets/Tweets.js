import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchUsers } from "../../api/api";
import { UserItem } from "../../components/UserItem/UserItem";
import { Loader } from "../../components/Loader/Loader";
import Back from "../../components/Back/Back";

const usersPerPage = 3;

// 

const Tweets = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filterOption, setFilterOption] = useState('all'); // Default option is 'all'

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
      };
      getUsers();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const filteredUsers = users.filter((user) => {
    if (filterOption === 'follow') {
      return !user.isFollowing;
    } else if (filterOption === 'following') {
      return user.isFollowing;
    }
    return true; // 'all' option, show all users
  });

  const onLoadMoreClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  return (
    <>
      <Back />
      <select value={filterOption} onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="follow">Follow</option>
        <option value="following">Following</option>
      </select>
      {isLoading && <Loader />}
      <ul>
        {filteredUsers.slice(0, page * usersPerPage).map(({ id, user, tweets, followers, avatar }) => {
          return (
            <UserItem key={id} id={id} user={user} tweets={tweets} followers={followers} avatar={avatar} />
          )
        })}
      </ul>
      {filteredUsers.length > page * usersPerPage && (
        <button type='button' onClick={onLoadMoreClick}>Load more</button>
      )}
      <ToastContainer autoClose={3000} limit={1} />
    </>
  );
};

export default Tweets;