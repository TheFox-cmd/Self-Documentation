import { IPage, IUserContext } from './types'
import { createContext } from 'react';

const UserContext = createContext<IUserContext>({
  handleNewPage: (page : IPage) => {},
  handlePageEdit: (page : IPage) => {},
  handlePageSelect: (newOpenID : number) => {},
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
