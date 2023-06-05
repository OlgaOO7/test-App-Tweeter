import { useState, useEffect } from 'react';
import { fetchUsers } from '../../api/api';
import { UserItem } from '../UserItem/UserItem';
import { Loader } from '../Loader/Loader';

export const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      const getUsers = async () => {
        const { data } = await fetchUsers();
        console.log(data);
        // const usersArr = data.map(({user, tweets, followers, avatar}) => ({user, tweets, followers, avatar}));
        if (!data.length) {
          setIsLoading(false);
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

  const onLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      {isLoading && <Loader />}
      <ul>
        {users.length > page && (
          <>
            {users.map(({ id, user, tweets, followers, avatar }) => {
              return (
                <UserItem
                  key={id}
                  id={id}
                  user={user}
                  tweets={tweets}
                  followers={followers}
                  avatar={avatar}
                />
              );
            })}
          </>
        )}
      </ul>
      <button type="button" onClick={onLoadMoreClick}>
        Loading more
      </button>
    </>
  );
};
