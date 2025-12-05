const FriendItem = ({ user }) => {
  return (
    <li className="friend-item">
      <div className="friend-item-image">
        <h1>{user.slice(0, 1)}</h1>
      </div>
      <h3>{user}</h3>
    </li>
  );
};

export default FriendItem;
