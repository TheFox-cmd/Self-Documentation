import { useContext, useState, useEffect, useRef } from 'react';
import Icon from '../data/react-icons';
import Private from "./private";
import {IPage} from '../data/types.js';
import UserContext from '../data/userContext';
import Template from './template';

const Navbar : React.FC = () => {
  const username = "Andy";

  const { 
    handlePageAdd, 
    pageList,
  } = useContext(UserContext)

  const newPage : IPage = {
    Index: pageList.length,
    // Title: "Untitled", 
    Title: (pageList.length).toString(),
    Description: "",
    Created: new Date().toLocaleString(),
    Recent: new Date().toLocaleString(),
    Port: "regular"
  }

  const [template, setTemplate] = useState(false)
  
  /**
   * Acquire page template pop-up on adding new page
   * @param apply 
   * @param e 
   * @returns 
   */
  const handleTemplate : (apply : boolean, e? : KeyboardEvent) => void = (apply, e) => {
    if (apply) handlePageAdd(newPage)
    else if (e && e?.key !== "Escape") return 
    setTemplate(false)
  }

  /**
   * Renders during unmounting to remove unconnected event listeners for template selection
   */
  useEffect(() => {
    const handleKeyDown = (e : KeyboardEvent) => handleTemplate(false, e);
  
    document.addEventListener('keydown', handleKeyDown);
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
          <li className="pl-1 pb-1 pt-1 w-11/12 hover:bg-zinc-200 hover:bg-opacity-25 rounded-lg">
            <button className="flex w-full">
              <Icon.BiSearchAlt className="w-5 h-5 mt-0.5" />
              <span className="ml-3">Search</span>
            </button>
          </li>
          <li className="pl-1 pb-1 pt-1 w-11/12 hover:bg-zinc-200 hover:bg-opacity-25 rounded-lg">
            <button className="flex w-full">
              <Icon.IoSettingsOutline className="w-5 h-5 mt-0.5"/>
              <span className="ml-3">Settings</span>
            </button>
          </li>
          {pageList.filter((item : IPage) => item.Port === "star").map((item : IPage, i : number) => <Private key={i} pageIndex={item.Index} page={item}/>)}
          {/* Holds Getting Started */}
          <li className="mt-8 pl-1 pb-1 pt-1 w-11/12 hover:bg-zinc-200 hover:bg-opacity-25 rounded-lg">
            <button className="flex w-full">
              <Icon.MdOutlineContactPage className="w-5 h-5 mt-0.5" />
              <span className="ml-3">Getting Started</span>
            </button>
          </li>
          {/* Create New Page */}
          <li className="pl-1 pb-1 pt-1 w-11/12 hover:bg-zinc-200 hover:bg-opacity-25 rounded-lg">
            <button className="flex w-full" onClick={() => setTemplate(true)}>
              <Icon.FiPlus className="w-5 h-5 mt-0.5" />
              <span className="ml-3">Add a New Page</span>
            </button>
          </li>
          {/* Prompts Template Page */}
          {template && <Template handleTemplate={handleTemplate}/>}
          {/* Render Private Page List */}
          {pageList.filter((item : IPage) => item.Port === "regular").map((item : IPage, i : number) => <Private key={i} pageIndex={item.Index} page={item}/>)}
          {/* Holds Calender, Templates, Trash */}
          <li className="mt-8 pl-1 pb-1 pt-1 w-11/12 hover:bg-zinc-200 hover:bg-opacity-25 rounded-lg">
            <button className="flex w-full">
              <Icon.SlCalender className="w-5 h-5 mt-0.5" />
              <span className="ml-3">Calender</span>
            </button>
          </li>
          <li className="pl-1 pb-1 pt-1 w-11/12 hover:bg-zinc-200 hover:bg-opacity-25 rounded-lg">
            <button className="flex w-full">
              <Icon.RiShapesFill className="w-5 h-5 mt-0.5" />
              <span className="ml-3">Templates</span>
            </button>
          </li>
          <li className="pl-1 pb-1 pt-1 w-11/12 hover:bg-zinc-200 hover:bg-opacity-25 rounded-lg">
            <button className="flex w-full">
              <Icon.FaRegTrashCan className="w-5 h-5 mt-0.5" />
              <span className="ml-3">Trash</span>
            </button>
          </li>
          {pageList.filter((item : IPage) => item.Port === "trash").map((item : IPage, i : number) => <Private key={i} pageIndex={item.Index} page={item}/>)}
          <li className="pl-1 pb-1 pt-1 w-11/12 hover:bg-zinc-200 hover:bg-opacity-25 rounded-lg">
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
