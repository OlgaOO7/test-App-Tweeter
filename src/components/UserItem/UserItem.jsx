import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const UserItem = ({ id, user, tweets, followers, avatar, isFollowing }) => {
const [isFollowingState, setIsFollowingState] = useState(isFollowing);
  const [followersCount, setFollowersCount] = useState(JSON.parse(localStorage.getItem(`followersCount-${id}`)) || followers);

  useEffect(() => {
    localStorage.setItem(`followStatus-${id}`, JSON.stringify(isFollowingState));
    localStorage.setItem(`followersCount-${id}`, JSON.stringify(followersCount));
  }, [id, isFollowingState, followersCount]);

  const handleFollowClick = () => {
    if (isFollowingState) {
      setFollowersCount((prevFollowCount) => prevFollowCount - 1);
      localStorage.removeItem(`followStatus-${id}`);
    } else {
      setFollowersCount((prevFollowCount) => prevFollowCount + 1);
      localStorage.setItem(`followStatus-${id}`, JSON.stringify(true));
    }
    setIsFollowingState((prevFollowing) => !prevFollowing);
  };

  useEffect(() => {
    localStorage.setItem(`followersCount-${id}`, followersCount.toString());
  }, [id, followersCount]);

  return (
    <li>
      <img src={avatar} alt={user} />
      <p>{user}</p>
      <p>{new Intl.NumberFormat('en-En').format(tweets)} Tweets</p>
      <p>{new Intl.NumberFormat('en-En').format(followersCount)} Followers</p>
      <button type="button" onClick={handleFollowClick}>
        {isFollowingState ? 'Following' : 'Follow'}
      </button>
    </li>
  );
};

UserItem.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  tweets: PropTypes.number.isRequired,
  followers: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
};
