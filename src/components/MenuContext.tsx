import Icon from '../data/react-icons.js';

import {IPage} from '../data/types.js';

interface MenuContextProp {

}

const MenuContext : React.FC<MenuContextProp> = () => {
  const data = [
    {
      id: 1,
      title: "Duplicate",
    },
    {
      id: 2,
      title: "Delete",
    },
    {
      id: 3,
      title: "Message 3",
    },
    {
      id: 4,
      title: "Message 4",
    },
  ];

  return (
    <div></div>
  );
}

export default MenuContext;
