export interface IPage {
  Title: string; 
  Description: string; 
  Created: string;
  Recent: string;
}

export interface IUserContext {
  handleNewPage: (page : IPage) => void;
  handlePageEdit: (page : IPage) => void;
  handlePageSelect: (newOpenID: number) => void;
  currPageList: IPage[];
  page: IPage;
  pageID: number;
}
