const FriendItem = ({ user }) => {
  const cheese = () => {
    console.log(`Hey there, I'm ${user}`);
  };

  return (
    <li className="friend-item" onClick={cheese}>
      <div className="friend-item-image">
        <h1>{user?.slice(0, 1)}</h1>
      </div>
      <h3>{user}</h3>
    </li>
  );
};

export default FriendItem;
