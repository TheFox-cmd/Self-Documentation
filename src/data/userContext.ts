import { IPage, IUserContext } from './types'
import { createContext } from 'react';

const UserContext = createContext<IUserContext>({
  handlePageAdd: (page : IPage, pageIndex? : number) => {},
  handlePageEdit: (page : IPage) => {},
  handlePageSelect: (newOpenID : number) => {},
  handlePageRemove: (pageIndex : number) => {},
  currPageList: [],
  page: {
    Title: "",
    Description: "", 
    Created: "",
    Recent: ""
  },
  pageID : -1
});

export default UserContext;
