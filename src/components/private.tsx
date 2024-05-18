import {IPage} from '../data/types';

interface privateProp{
  handlePageSelect : (newOpenID : number) => void,
  pageNum : number, 
  page : IPage
}

const Private : React.FC<privateProp> = ({handlePageSelect, pageNum, page}) => {
  const handleMenuContext : (page : IPage) => void = () => {

  }

  return (
    <div>
      <div className="underline" onClick={() => handlePageSelect(pageNum)} onContextMenu={() => {}}>
        <span>{page.Title}</span>
        <button onClick={(e) => {
            e.preventDefault(); 

          }}
        >...</button>
      </div>
    </div>
  );
}

export default Private;