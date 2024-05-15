import React, { useState } from 'react';
import './App.css';
import Page from './components/page'
import Navbar from './components/navbar';
import {IPage} from './types';

function App() {
  /**
   * 1. Showcase each page on click
   */
  const [openID, setOpenID] = useState<number>(-1);
  const [currPageList, setPageList] = useState<IPage[]>([]);

  const createNewPage : (page : IPage) => void = (page) => {
    const newPageList : IPage[] = [...currPageList, page]
    setPageList(newPageList);
    setOpenID(currPageList.length);
    console.log(newPageList)
  }

  const editPage : (page : IPage) => void = (page) => {
    const newPageList : IPage[] = [...currPageList];
    newPageList[openID] = page; 
    setPageList(newPageList);
    console.log(newPageList);
  }

  const selectPage : (newOpenID : number) => void = (newOpenID) => {
    setOpenID(newOpenID)
  }

  return ( 
    <div className='flex'>
      <Navbar createNewPage={createNewPage} selectPage={selectPage} pageList={currPageList}/>
      {currPageList.length !== 0 ? <Page editPage={editPage} page={currPageList[openID]}/> : <div/>} 
    </div>
  );
}

export default App;
