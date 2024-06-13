import { useEffect, useState } from 'react';
import { IPage } from "./data/types";
import UserContext from './data/userContext';
import Page from './components/page'
import Navbar from './components/navbar';
import api from './api';
interface attributeProp {
  setUpdate : React.Dispatch<React.SetStateAction<boolean>>
}

const attribute : React.FC<attributeProp> = ({ setUpdate }) => {
    
  const [pageIndex, setPageIndex] = useState<number>(-1);
  const [pageList, setPageList] = useState<IPage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/pages`);
        const remappedPages = response.data.map((page : IPage, index : number) => ({
          ...page,
          Index: index, 
        }));

        await Promise.all(
          remappedPages.map(async (page : IPage) => {
            await api.put(`/pages/${page.id}`, page);
          })
        );

        console.log("ALL: ", remappedPages)

        setPageList(remappedPages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
  }, []);

  /**
   * Acquire page base on page index
   */
  const emptyPage : IPage = {
    Index: NaN,
    Title: "Error",
    Description: "Error", 
    Created: "Error",
    Recent: "Error",
    Port: "Error",
  }

  /**
   * Create new page object and append to page list
   * @param page
   */
  const handlePageAdd : (page : IPage) => void = (page) => {
    const newPageList : IPage[] = [...pageList]
    

    // * POST new page to backend
    api.post('/pages', page)
      .then(newPage => {
        console.log("Response: ", newPage.data)
        newPageList.push(newPage.data)
        setPageList(newPageList);
        setPageIndex(pageList.length)
        console.log(newPageList)
      })
      .catch(error => console.log("Error: ", error))
  }

  /**
   * Edit page object based on pageIndex
   * @param page 
   */
  const handlePageEdit : (page : IPage) => void = (page) => {
    const newPageList : IPage[] = [...pageList];
    const index = newPageList.map((item) => item.Index).indexOf(page.Index)

    // * throw Error if index is not found when editing
    try {
      if (index < 0) throw new Error("Error: Index not found in page list while editing");
    } catch (e : any) {
      console.log(e.message);
      return
    } 

    newPageList[index] = page; 
    setPageList(newPageList);

    // * EDIT existing page to backend
    console.log(page, page.id)
    api.put(`/pages/${page.id}`, page)
      .then(response => console.log("Response: ", response.data))
      .catch(error => console.log("Save Error: ", error))
  }

  /**
   * Set page index to be opened
   * @param selectedIndex 
   */
  const handlePageSelect : (selectedIndex : number) => void = (selectedIndex) => {
    setPageIndex(selectedIndex)
    console.log(pageList, pageList[selectedIndex], pageList[selectedIndex].id)
  }

  /**
   * Remove page from private page list
   * @param pageIndex 
   */
  const handlePageRemove : (pageIndex : number, port : string) => void = (pageIndex, port) => {
    const portList : String[] = ["star", "regular", "trash", "permanent"]

    // * throw Error if port is not in portList
    try {
      if (portList.indexOf(port) === -1) throw new Error("Wrong port connection while moving");
    } catch (e : any) {
      console.log(e.message);
      return
    } 

    let newPageList : IPage[] = [...pageList]

    // * Find according item index
    const removedPage : IPage | undefined = pageList.find((item) => item.Index === pageIndex);
    if (!removedPage) return 

    // * Remove and append new page if necessary
    const removeIndex = newPageList.indexOf(removedPage)
    newPageList.splice(removeIndex, 1)
    if (port !== "permanent") {
      const newPortPage = {...removedPage, Port: port};
      newPageList[newPageList.length] = newPortPage;
    
      // * EDIT existing page to backend
      api.put(`/pages/${page.id}`, newPortPage)
        .then(response => console.log("Response: ", response.data))
        .catch(error => console.log("Edit Error: ", error))
    } else {
      newPageList = newPageList.map((item, index) => ({...item, Index : index}))

      // * DELETE from database when permanently removed
      api.delete(`/pages/${page.id}`)
      .then(response => console.log("Response: ", response.data))
      .catch(error => console.log("Error: ", error))
    }
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
    id: page.id
  }

  return (
    <UserContext.Provider value={theme}>
      <Navbar setUpdate={setUpdate}/>  
      {pageIndex !== -1 ? <Page /> : <div/>} 
    </UserContext.Provider>
  )
}

export default attribute;