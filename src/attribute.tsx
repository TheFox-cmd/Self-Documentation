import { useState } from 'react';
import { IPage } from "./data/types";
import UserContext from './data/userContext';
import Page from './components/page'
import Navbar from './components/navbar';

const attribute : React.FC = () => {
    
  const [pageIndex, setPageIndex] = useState<number>(-1);
  const [pageList, setPageList] = useState<IPage[]>([]);

  /**
   * Acquire page base on page index
   */
  const emptyPage : IPage = {
    Index: NaN,
    Title: "Error",
    Description: "Screen", 
    Created: "",
    Recent: "",
    Port: ""
  }

  /**
   * Create new page object and append to page list
   * @param page
   */
  const handlePageAdd : (page : IPage) => void = (page) => {
    const newPageList : IPage[] = [...pageList]
    newPageList.push(page)
    setPageIndex(pageList.length)
    setPageList(newPageList);
    console.log(newPageList)
  }

  /**
   * Edit page object based on pageIndex
   * @param page 
   */
  const handlePageEdit : (page : IPage) => void = (page) => {
    const newPageList : IPage[] = [...pageList];
    newPageList[pageIndex] = page; 
    setPageList(newPageList);
  }

  /**
   * Set page index to be opened
   * @param selectedIndex 
   */
  const handlePageSelect : (selectedIndex : number) => void = (selectedIndex) => {
    setPageIndex(selectedIndex)
  }

  /**
   * Remove page from private page list
   * @param pageIndex 
   */
  const handlePageRemove : (pageIndex : number, port : string) => void = (pageIndex, port) => {
    let newPageList : IPage[] = [...pageList]

    // * Find according item index
    const removedPage : IPage | undefined = pageList.find((item) => item.Index === pageIndex);
    if (!removedPage) return 

    // * Remove and append new page if necessary
    const removeIndex = newPageList.indexOf(removedPage)
    newPageList.splice(removeIndex, 1)
    if (port !== "permanent") newPageList[newPageList.length] = {...removedPage, Port: port}
    else newPageList = newPageList.map((item, index) => ({...item, Index : index}))
    setPageList(newPageList);

    // * Render empty screen after delete actions
    if (port === "trash" || port === "permanent") setPageIndex(-1);
  }

  const page: IPage = pageList.find((item) => item.Index === pageIndex) || emptyPage;

  const theme = {
    handlePageAdd,
    handlePageEdit,
    handlePageSelect,
    handlePageRemove,
    pageIndex, 
    page,
    pageList,
  }

  return (
    <UserContext.Provider value={theme}>
      <Navbar/>  
      {pageIndex !== -1 ? <Page /> : <div/>} 
    </UserContext.Provider>
  )
}

export default attribute;