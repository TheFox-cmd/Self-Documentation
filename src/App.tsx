import { useState } from 'react';
import './App.css';
import Page from './components/page'
import Navbar from './components/navbar';
import {IPage} from './data/types';
import UserContext from './data/userContext';

function App() {
  /**
   * TODO: Duplicate
   * TODO: Delete
  */ 

  const [openID, setOpenID] = useState<number>(-1);
  const [currPageList, setPageList] = useState<IPage[]>([]); 

  /**
   * Create new page object and append to page list
   * @param page
   */
  const handleNewPage : (page : IPage) => void = (page) => {
    const newPageList : IPage[] = [...currPageList, page]
    setPageList(newPageList);
    setOpenID(currPageList.length);
    console.log(newPageList)
  }

  /**
   * Edit page object based on pageID
   * @param page 
   */
  const handlePageEdit : (page : IPage) => void = (page) => {
    const newPageList : IPage[] = [...currPageList];
    newPageList[openID] = page; 
    setPageList(newPageList);
    console.log(newPageList);
  }

  /**
   * Set page ID to be opened
   * @param newOpenID 
   */
  const handlePageSelect : (newOpenID : number) => void = (newOpenID) => {
    setOpenID(newOpenID)
  }

  /**
   * Acquire page base on ID
   */
  const page = currPageList[openID];

  return ( 
    <div className ="flex w-screen h-screen bg-stone-900">
      <UserContext.Provider 
        value={{ handleNewPage, handlePageEdit, handlePageSelect, currPageList, page, pageID : openID }}
      >
        <Navbar/>  
        {openID !== -1 ? <Page /> : <div/>} 
      </UserContext.Provider>
    </div>
  );
}

export default App;
