export interface IPage {
  Index: number;
  Title: string; 
  Description: string; 
  Created: string;
  Recent: string;
  Port: string;           // star, regular, trash, permanent
}

export interface IUserContext {
  handlePageAdd: (page : IPage) => void;
  handlePageEdit: (page : IPage) => void;
  handlePageSelect: (pageIndex: number) => void;
  handlePageRemove: (pageIndex : number, port : string) => void;
  pageList: IPage[];
  page: IPage;
  pageIndex: number;
}
