import { RefObject, useContext } from 'react';
import UserContext from '../data/userContext';
import {IPage} from '../data/types.js';

interface MenuContextProp {
  contextPosition : {x : number, y : number},
  menuRef: RefObject<HTMLDivElement>,
  pageIndex: number,
  handlePageDuplication: (page : IPage) => void,
  handlePageMove: (pageIndex : number, port : string) => void
}

const MenuContext : React.FC<MenuContextProp> = ({ contextPosition, menuRef, pageIndex, handlePageDuplication, handlePageMove }) => {
  const { 
    page,
  } = useContext(UserContext);

  return (
    <div
      className='absolute bg-amber-500 p-2 w-1/2 h-1/2'
      style={{ top: contextPosition.y, left: contextPosition.x }}
      ref={ menuRef }
    >
      <ul>
        <li className='p-1' onClick={() => handlePageMove(pageIndex, "star")}>Star</li>
        <li className='p-1' onClick={() => handlePageMove(pageIndex, "regular")}>Restore</li>
        <li className='p-1' onClick={() => handlePageDuplication(page)}>Duplicate</li>
        <li className='p-1' onClick={() => handlePageMove(pageIndex, "trash")}>Delete</li>
        <li className='p-1' onClick={() => handlePageMove(pageIndex, "permanent")}>Permanently Removed</li>
      </ul>
    </div>
  )
}

export default MenuContext;
