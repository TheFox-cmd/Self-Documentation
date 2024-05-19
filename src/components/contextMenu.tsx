import { RefObject, useContext } from 'react';
import UserContext from '../data/userContext';
import {IPage} from '../data/types.js';

interface MenuContextProp {
  contextPosition : {x : number, y : number},
  menuRef: RefObject<HTMLDivElement>;
}

const MenuContext : React.FC<MenuContextProp> = ({ contextPosition, menuRef }) => {
  const { 
    handlePageSelect,
    page,
    pageID,
    ...rest 
  } = useContext(UserContext);

  const handlePageDuplication : (page : IPage) => void = () => {

  }

  // delete set openID to -1
  const handlePageDeletion : (page : IPage) => void = () => {

  }

  return (
    <div
      className='absolute bg-amber-500 p-2 w-1/2 h-1/2'
      style={{ top: contextPosition.y, left: contextPosition.x }}
      ref={ menuRef }
    >
      <ul>
        <li className='p-1' onClick={() => {}}>Duplicate</li>
        <li className='p-1' onClick={() => {}}>Delete</li>
      </ul>
    </div>
  )
}

export default MenuContext;
