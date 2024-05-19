import { useContext } from 'react';
import Icon from '../data/react-icons';
import Private from "./private";
import {IPage} from '../data/types.js';
import UserContext from '../data/userContext';

const Navbar : React.FC = () => {
  const liStyle = "pl-1 pb-1 pt-1 w-11/12 hover:bg-zinc-200 hover:bg-opacity-25 rounded-lg"
  
  const username = "Andy";

  const { 
    handleNewPage, 
    handlePageSelect, 
    currPageList : pageList,
    ...rest 
  } = useContext(UserContext)

  const newPage : IPage = {
    Title: "Untitled", 
    Description: "",
    Created: new Date().toLocaleString(),
    Recent: new Date().toLocaleString()
  }

  return (
    // Holds house icon, Name
    <div className="w-[250px] bg-stone-800 h-screen">
      <div className="ml-3 mt-3">
        <div className="text-slate-300">
          <Icon.FaHouseUser className="w-6 h-6 inline pb-1" />
          <span className="ml-3">{username}'s </span>
        </div>
        <ul className="block mt-5 text-slate-400">
          {/* Hold Search and Settings buttons */}
          <li className={ liStyle }>
            <button className="flex w-full">
              <Icon.BiSearchAlt className="w-5 h-5 mt-0.5" />
              <span className="ml-3">Search</span>
            </button>
          </li>
          <li className={ liStyle }>
            <button className="flex w-full">
              <Icon.IoSettingsOutline className="w-5 h-5 mt-0.5"/>
              <span className="ml-3">Settings</span>
            </button>
          </li>
          {/* Holds Getting Started */}
          <li className="mt-8 pl-1 pb-1 pt-1 w-11/12 hover:bg-zinc-200 hover:bg-opacity-25 rounded-lg">
            <button className="flex w-full">
              <Icon.MdOutlineContactPage className="w-5 h-5 mt-0.5" />
              <span className="ml-3">Getting Started</span>
            </button>
          </li>
          {/* Create New Page */}
          <li className={ liStyle }>
            <button className="flex w-full" onClick={() => handleNewPage(newPage)}>
              <Icon.FiPlus className="w-5 h-5 mt-0.5" />
              <span className="ml-3">Add a New Page</span>
            </button>
          </li>
          {/* Render Private Page List */}
          {pageList.map((item : IPage, i : number) => <Private key={i} pageID={i} page={item}/>)}
          {/* Holds Calender, Templates, Trash */}
          <li className="mt-8 pl-1 pb-1 pt-1 w-11/12 hover:bg-zinc-200 hover:bg-opacity-25 rounded-lg">
            <button className="flex w-full">
              <Icon.SlCalender className="w-5 h-5 mt-0.5" />
              <span className="ml-3">Calender</span>
            </button>
          </li>
          <li className={ liStyle }>
            <button className="flex w-full">
              <Icon.RiShapesFill className="w-5 h-5 mt-0.5" />
              <span className="ml-3">Templates</span>
            </button>
          </li>
          <li className={ liStyle }>
            <button className="flex w-full">
              <Icon.FaRegTrashCan className="w-5 h-5 mt-0.5" />
              <span className="ml-3">Trash</span>
            </button>
          </li>
          <li className={ liStyle }>
            <button className="flex w-full">
              <Icon.IoInformationCircleSharp className="w-5 h-5 mt-0.5" />
              <span className="ml-3">About</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}



export default Navbar;
