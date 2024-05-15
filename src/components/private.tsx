import {IPage} from '../types';

interface privateProp{
  selectPage : (newOpenID : number) => void,
  pageNum : number, 
  page : IPage
}

const Private : React.FC<privateProp> = ({selectPage, pageNum, page}) => {
  const renderPage : (page : IPage) => void = () => {
    
  }
  
  const action : (page : IPage) => void = () => {

  }

  const currPage = {
    Title: page.Title, 
    Description: page.Description,
    Created: page.Created,
    Recent: new Date().toLocaleString(),
  }

  return (
    <div>
      <div className="underline" onClick={() => selectPage(pageNum)}>{page.Title}</div>
      <button onClick={() => {}}>...</button>
    </div>
  );
}

export default Private;