import { useState } from 'react';
import './App.css';
import Page from './components/page'
import Navbar from './components/navbar';
import {IPage} from './data/types';

function App() {
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

  return ( 
    <div className ="flex w-screen h-screen bg-stone-900">
      <Navbar handleNewPage={handleNewPage} handlePageSelect={handlePageSelect} pageList={currPageList}/>
      {currPageList.length !== 0 && openID !== -1 ? <Page handlePageEdit={handlePageEdit} page={currPageList[openID]}/> : <div/>} 
    </div>
  );
}

export default App;
