import ListItem from "./ListItem.jsx";

const List = ({ array }) => {
  return (
    <ul>
      {array.map((item) => {
        return <ListItem key={item.id} text={item.text} />;
      })}
    </ul>
  );
};

export default List;
