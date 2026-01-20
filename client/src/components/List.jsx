/**
 * List.jsx
 *
 * - Renders a list of items using ListItem
 */

import ListItem from "./ListItem.jsx";

/**
 * - List({ array })
 *
 * - Renders a list of items from the provided array
 */
const List = ({ array }) => {
  return (
    <ul>
      {array.map((item) => {
        // Render each feature as a list item
        return <ListItem key={item.id} text={item.text} />;
      })}
    </ul>
  );
};

export default List;
