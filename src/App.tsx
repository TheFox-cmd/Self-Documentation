import { useState } from 'react';
import './App.css';
import Page from './components/page'
import Navbar from './components/navbar';
import {IPage} from './data/types';
import UserContext from './data/userContext';

function App() {
  const [pageIndex, setPageIndex] = useState<number>(-1);
  const [currPageList, setPageList] = useState<IPage[]>([]); 

  /**
   * Create new page object and append to page list
   * @param page
   */
  const handlePageAdd : (page : IPage, pageIndex? : number) => void = (page, pageIndex = currPageList.length) => {
    const newPageList : IPage[] = [...currPageList]
    newPageList.splice(1, 0, page)
    setPageList(newPageList);
    setPageIndex(pageIndex);
    console.log(newPageList, pageIndex)
  }

  /**
   * Edit page object based on pageID
   * @param page 
   */
  const handlePageEdit : (page : IPage) => void = (page) => {
    const newPageList : IPage[] = [...currPageList];
    newPageList[pageIndex] = page; 
    setPageList(newPageList);
    console.log(newPageList);
  }

  /**
   * Set page ID to be opened
   * @param newOpenID 
   */
  const handlePageSelect : (newOpenID : number) => void = (newOpenID) => {
    setPageIndex(newOpenID)
  }

  /**
   * Remove page from private page list
   * @param pageIndex 
   */
  const handlePageRemove : (pageIndex : number) => void = (pageIndex) => {
    const newPageList : IPage[] = [...currPageList]
    newPageList.splice(pageIndex, 1)
    setPageList(newPageList);
    setPageIndex(-1);
    console.log(newPageList, pageIndex)
  }

  /**
   * Acquire page base on ID
   */
  const page = currPageList[pageIndex];

  return ( 
    <div className ="flex w-screen h-screen bg-stone-900">
      <UserContext.Provider 
        value={{ handlePageAdd, handlePageEdit, handlePageSelect, handlePageRemove, currPageList, page, pageID : pageIndex }}
      >
        <Navbar/>  
        {pageIndex !== -1 ? <Page /> : <div/>} 
      </UserContext.Provider>
    </div>
  );
}

export default App;
