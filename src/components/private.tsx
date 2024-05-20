import { useState, useEffect, useRef, useContext } from 'react';
import ContextMenu from './contextMenu'
import UserContext from '../data/userContext';
import { IPage } from '../data/types';

interface privateProp{
  pageIndex : number, 
  page : IPage
}

const Private : React.FC<privateProp> = ({pageIndex, page}) => {
  const pageStyle = "underline hover:cursor-pointer pl-1 pb-1 pt-1 w-11/12 hover:bg-zinc-200 hover:bg-opacity-25 rounded-lg"
  
  const { 
    handlePageAdd,
    handlePageSelect,
    handlePageRemove,
    pageID,
    ...rest 
  } = useContext(UserContext);

  const [click, setClick] = useState(false);
  const [contextPosition, setContextPosition] = useState({
    x: 0, 
    y: 0
  });
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
   * Renders during unmounting to remove unconnected event listeners
   */
  useEffect(() => {
    document.addEventListener('mousedown', handleClickClearMenuContext);
    document.addEventListener('keydown', handleKeyClearMenuContext);

    return () => {
      document.removeEventListener('mousedown', handleClickClearMenuContext);
      document.removeEventListener('keydown', handleKeyClearMenuContext);
    };
  }, []);

  const handlePageDuplication : (page : IPage) => void = () => {
    const dupePage : IPage = {
      Title: page.Title, 
      Description: page.Description,
      Created: new Date().toLocaleString(),
      Recent: new Date().toLocaleString()
    }

    handlePageAdd(dupePage, pageID + 1)
    setClick(false);
  }

  // delete set pageIndex to -1
  const handlePageDeletion : (pageIndex : number) => void = (pageIndex) => {
    handlePageRemove(pageIndex);
    setClick(false);
  }

  return (
    <>
      <div onContextMenu={handleMenuContext}>
        <div className={pageStyle} onClick={() => handlePageSelect(pageIndex)}>
          <span>{page.Title}</span>
          <button onClick={handleMenuContext}>...</button>
        </div>
      </div>
      {click && <ContextMenu 
        contextPosition={contextPosition} 
        menuRef={menuRef} 
        handlePageDuplication={handlePageDuplication} 
        handlePageDeletion={handlePageDeletion}
      />}
    </>
    
  );
}

export default Private;