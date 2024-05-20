import { RefObject, SetStateAction, useContext } from 'react';
import UserContext from '../data/userContext';
import {IPage} from '../data/types.js';

interface MenuContextProp {
  contextPosition : {x : number, y : number},
  menuRef: RefObject<HTMLDivElement>,
  handlePageDuplication: (page : IPage) => void,
  handlePageDeletion: (pageIndex : number) => void
}

const MenuContext : React.FC<MenuContextProp> = ({ contextPosition, menuRef, handlePageDuplication, handlePageDeletion }) => {
  const { 
    page,
    pageID,
    ...rest 
  } = useContext(UserContext);

  return (
    <div
      className='absolute bg-amber-500 p-2 w-1/2 h-1/2'
      style={{ top: contextPosition.y, left: contextPosition.x }}
      ref={ menuRef }
    >
      <ul>
        <li className='p-1' onClick={() => handlePageDuplication(page)}>Duplicate</li>
        <li className='p-1' onClick={() => handlePageDeletion(pageID)}>Delete</li>
      </ul>
    </div>
  )
}

export default MenuContext;
