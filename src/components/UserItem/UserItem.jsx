import PropTypes from "prop-types";

export const UserItem = ({id, user, tweets, followers, avatar}) => {

  return (
    <li >
      <img src={avatar} alt={user} />
      <p>{user}</p>
      <p>{tweets} Tweets</p>
      <p>{followers} Followers</p>
      <button type="button">Follow</button>
    </li>
  )
}