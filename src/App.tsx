import React, { useState } from 'react';
import './App.css';
import Page from './components/page'
import Navbar from './components/navbar';
import {IPage} from './data/types';

function App() {
  /**
   * 1. Showcase each page on click
   */
  const [openID, setOpenID] = useState<number>(-1);
  const [currPageList, setPageList] = useState<IPage[]>([]);

  const handleNewPage : (page : IPage) => void = (page) => {
    const newPageList : IPage[] = [...currPageList, page]
    setPageList(newPageList);
    setOpenID(currPageList.length);
    console.log(newPageList)
  }

  const handlePageEdit : (page : IPage) => void = (page) => {
    const newPageList : IPage[] = [...currPageList];
    newPageList[openID] = page; 
    setPageList(newPageList);
    console.log(newPageList);
  }

  const handlePageSelect : (newOpenID : number) => void = (newOpenID) => {
    setOpenID(newOpenID)
  }

  return ( 
    <div className ="flex w-screen h-screen bg-stone-900">
      <Navbar handleNewPage={handleNewPage} handlePageSelect={handlePageSelect} pageList={currPageList}/>
      {currPageList.length !== 0 ? <Page handlePageEdit={handlePageEdit} page={currPageList[openID]}/> : <div/>} 
    </div>
  );
}

export default App;
