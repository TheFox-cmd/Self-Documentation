import { RefObject, useContext } from 'react';
import UserContext from '../data/userContext';
import {IPage} from '../data/types.js';
import Icon from '../data/react-icons';

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

  const listStyle = "p-1 flex w-full hover:bg-zinc-200 hover:bg-opacity-25 rounded-lg pr-2"

  return (
    <div
      className='absolute bg-zinc-700 rounded p-2 w-auto h-auto text-neutral-300'
      style={{ top: contextPosition.y, left: contextPosition.x }}
      ref={ menuRef }
    >
      <ul>
        <li className={listStyle} onClick={() => handlePageMove(pageIndex, "star")}><Icon.FaRegStar className="w-5 h-5 mt-0.5 mr-1.5"/>Favorite</li>
        {page.Port ===  "trash" && <li className={listStyle} onClick={() => handlePageMove(pageIndex, "regular")}>Restore</li>}
        <li className={listStyle} onClick={() => handlePageDuplication(page)}><Icon.SiPowerpages className="w-5 h-5 mt-0.5 mr-1.5"/>Duplicate</li>
        <li className={listStyle} onClick={() => handlePageMove(pageIndex, "trash")}><Icon.TiDelete className="w-5 h-5 mt-0.5 mr-1.5"/>Delete</li>
        {<li className={listStyle} onClick={() => handlePageMove(pageIndex, "permanent")}>Permanently Removed</li>}
      </ul>
    </div>
  )
}

export default MenuContext;
