import { RefObject } from 'react';
import Icon from '../data/react-icons.js';

import {IPage} from '../data/types.js';

interface MenuContextProp {
  click: boolean, 
  contextPosition : {x : number, y : number},
  menuRef: RefObject<HTMLDivElement>;
}

const MenuContext : React.FC<MenuContextProp> = ({ click, contextPosition, menuRef }) => {
  if (!click) return null

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
