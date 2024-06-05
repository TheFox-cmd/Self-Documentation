import { IPage, IUserContext } from './types'
import { createContext } from 'react';

/** initalization of userContext */
const UserContext = createContext<IUserContext>({
  handlePageAdd: (page : IPage) => {},
  handlePageEdit: (page : IPage) => {},
  handlePageSelect: (pageIndex : number) => {},
  handlePageRemove: (pageIndex : number, port : string) => {},
  pageList: [],
  page: {
    Index: NaN,
    Title: "",
    Description: "", 
    Created: "",
    Recent: "",
    Port: "",
    id: ""
  },
  pageIndex: -1,
 
});

export default UserContext;
