import { useState, useEffect, useRef, useContext } from 'react';
import ContextMenu from './contextMenu'
import UserContext from '../data/userContext';
import { IPage } from '../data/types';
import Icon from '../data/react-icons'; 

interface privateProp{
  page : IPage
}

const Private : React.FC<privateProp> = ({ page }) => {
  const pageStyle = "hover:cursor-pointer pl-1 pb-1 pt-1 w-11/12 hover:bg-zinc-200 hover:bg-opacity-25 rounded-lg flex"
  
  const { 
    handlePageAdd,
    handlePageSelect,
    handlePageRemove,
    pageList,
  } = useContext(UserContext);

  const [click, setClick] = useState(false);
  const [contextPosition, setContextPosition] = useState({
    x: 0, 
    y: 0
  });
  const [edit, setEdit] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /**
   * Acquire pop-up popsition for menu context
   * @param e
   */
  const handleMenuContext : (e : React.MouseEvent) => void = (e) => {
    e.preventDefault();
    setClick(true);
    const newContextPosition = {x : e.pageX, y : e.pageY}
    setContextPosition(newContextPosition);
  }

  /**
   * Clear menu context when mouse is clicked outside of the menu context
   * @param e 
   */
  const handleClickClearMenuContext : (e : MouseEvent) => void = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) setClick(false);
  }

  /**
   * Clear menu context when ESC is pressed
   * @param e 
   */
  const handleKeyClearMenuContext : (e : KeyboardEvent) => void = (e) => {
    if (e.key === "Escape") setClick(false);
  }

  /**
   * Renders during unmounting to remove unconnected event listeners for context menu
   */
  useEffect(() => {
    document.addEventListener('mousedown', handleClickClearMenuContext);
    document.addEventListener('keydown', handleKeyClearMenuContext);

    return () => {
      document.removeEventListener('mousedown', handleClickClearMenuContext);
      document.removeEventListener('keydown', handleKeyClearMenuContext);
    };
  }, []);

  /** redundant page variable  */
  const handlePageDuplication : (page : IPage) => void = (page) => {
    const dupePage : IPage = {
      Index: pageList.length,
      Title: page.Title, 
      Description: page.Description,
      Created: new Date().toLocaleString(),
      Recent: new Date().toLocaleString(),
      Port: page.Port
    }

    handlePageAdd(dupePage)
    setClick(false);
  }

  // delete set pageIndex to -1
  const handlePageMove : (pageIndex : number, port : string) => void = (pageIndex, port) => {
    handlePageRemove(pageIndex, port);
    setClick(false);
  }

  return (
    <>
      <div onContextMenu={handleMenuContext} onMouseOver={() => setEdit(true)} onMouseOut={() => setEdit(false)}>
        <div className={pageStyle} onClick={() => handlePageSelect(page.Index)}>
        <Icon.FaFileAlt className="w-5 h-5 mt-0.5"/>

          <span className="ml-3">{page.Title}</span>
          {edit && <button onClick={handleMenuContext}>...</button>}
        </div>
      </div>
      {click && <ContextMenu 
        contextPosition={contextPosition} 
        menuRef={menuRef} 
        handlePageDuplication={handlePageDuplication} 
        handlePageMove={handlePageMove}
        pageIndex={page.Index}
      />}
    </>
    
  );
}

export default Private;
