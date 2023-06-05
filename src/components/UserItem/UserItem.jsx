import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const UserItem = ({ id, user, tweets, followers, avatar }) => {
  const [isFollowing, setIsFollowing] = useState(JSON.parse(localStorage.getItem(`followStatus-${id}`)) ?? false);
  const [followersCount, setFollowersCount] = useState(JSON.parse(localStorage.getItem(`followersCount-${id}`)) ?? followers);

  useEffect(() => {
    // const storedFollowStatus = localStorage.getItem(`followStatus-${id}`);
    // if (storedFollowStatus) {
    //   setIsFollowing(JSON.parse(storedFollowStatus));
    // }
    localStorage.setItem(`followStatus-${id}`, JSON.stringify(isFollowing));
    localStorage.setItem(`followersCount-${id}`, JSON.stringify(followersCount))
  }, [id, isFollowing, followersCount ]);

  // useEffect(() => {
    // const storedFollowersCount = localStorage.getItem(`followersCount-${id}`);
    // if (storedFollowersCount) {
    //   setFollowersCount(parseInt(storedFollowersCount, 10));
    // }

  // }, [id]);

  const handleFollowClick = () => {
    if (isFollowing) {
      setFollowersCount(prevCount => prevCount - 1);
      localStorage.removeItem(`followStatus-${id}`);
    } else {
      setFollowersCount(prevCount => prevCount + 1);
      localStorage.setItem(`followStatus-${id}`, JSON.stringify(true));
    }
    setIsFollowing(prevFollowing => !prevFollowing);
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
        {isFollowing ? 'Following' : 'Follow'}
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
};
