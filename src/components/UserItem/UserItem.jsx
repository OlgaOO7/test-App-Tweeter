import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import logoImage from '../../images/logo.png';
import backgroundImage from '../../images/user-card.png';
import css from './UserItem.module.css';

export const UserItem = ({
  id,
  user,
  tweets,
  followers,
  avatar,
  isFollowing,
}) => {
  const [isFollowingState, setIsFollowingState] = useState(isFollowing);
  const [followersCount, setFollowersCount] = useState(
    JSON.parse(localStorage.getItem(`followersCount-${id}`)) || followers
  );

  useEffect(() => {
    localStorage.setItem(
      `followStatus-${id}`,
      JSON.stringify(isFollowingState)
    );
    localStorage.setItem(
      `followersCount-${id}`,
      JSON.stringify(followersCount)
    );
  }, [id, isFollowingState, followersCount]);

  const handleFollowClick = () => {
    if (isFollowingState) {
      setFollowersCount(prevFollowCount => prevFollowCount - 1);
      localStorage.removeItem(`followStatus-${id}`);
    } else {
      setFollowersCount(prevFollowCount => prevFollowCount + 1);
      localStorage.setItem(`followStatus-${id}`, JSON.stringify(true));
    }
    setIsFollowingState(prevFollowing => !prevFollowing);
  };

  useEffect(() => {
    localStorage.setItem(`followersCount-${id}`, followersCount.toString());
  }, [id, followersCount]);

  return (
    <li className={css.userItem}>
      <div className={css.cardWrapper}>
        <div className={css.elementImgWrapper}>
          <img src={logoImage} alt="logo" className={css.logo} />
          <img
            src={backgroundImage}
            alt="logo"
            className={css.backgroundImage}
          />
        </div>
        <div className={css.rectangleImage}></div>
        <div className={css.elipsWrapper}></div>
        <img src={avatar} alt={user} className={css.avatarImg} />

        <div className={css.elementsWrapper}>
          <p className={css.tweets}>
            {new Intl.NumberFormat('en-En').format(tweets)} Tweets
          </p>
          <p className={css.followers}>
            {new Intl.NumberFormat('en-En').format(followersCount)} Followers
          </p>
          <button
            type="button"
            onClick={handleFollowClick}
            className={`${css.btn} ${
              isFollowingState ? css.following : css.follow
            }`}
          >
            {isFollowingState ? 'Following' : 'Follow'}
          </button>
        </div>
      </div>
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
