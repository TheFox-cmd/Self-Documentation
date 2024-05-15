import {IPage} from '../types';
import Private from "./private";

interface navbarProp {
  createNewPage : (page : IPage) => void,
  selectPage : (newOpenID : number) => void,
  pageList : IPage[]
}

const Navbar : React.FC<navbarProp> = ({createNewPage, selectPage, pageList}) => {
  const newPage : IPage = {
    Title: "Untitled", 
    Description: "",
    Created: new Date().toLocaleString(),
    Recent: new Date().toLocaleString()
  }

  return (
    <div className="flex-initial w-64">
      <button onClick={() => createNewPage(newPage)}>Add Page</button>
      {
        pageList.map((item : IPage, i : number) => <Private selectPage={selectPage} key={i} pageNum={i} page={item}/>)
      }
    </div>
  );
}



export default Navbar;