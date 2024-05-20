export interface IPage {
  Title: string; 
  Description: string; 
  Created: string;
  Recent: string;
}

export interface IUserContext {
  handlePageAdd: (page : IPage, pageIndex? : number) => void;
  handlePageEdit: (page : IPage) => void;
  handlePageSelect: (newOpenID: number) => void;
  handlePageRemove: (pageIndex : number) => void;
  currPageList: IPage[];
  page: IPage;
  pageID: number;
}
