import { useContext, useState, useEffect, useRef, useReducer } from 'react';
import Icon from '../data/react-icons';
import Private from "./private";
import {IPage} from '../data/types.js';
import UserContext from '../data/userContext';
import Template from './template';
import { clearTokenAction, tokenReducer } from '../data/token';

interface navbarProp {
  setUpdate : React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar : React.FC<navbarProp> = ({ setUpdate }) => {
  const username = "Andy";
  const initialToken = localStorage.getItem("token") || '';
  const [token, dispatch] = useReducer(tokenReducer, { token: initialToken });
  const listStyle = "pl-1 pb-1 pt-1 w-11/12 hover:bg-zinc-200 hover:bg-opacity-25 rounded-lg";

  const { 
    handlePageAdd, 
    pageList,
  } = useContext(UserContext)

  const newPage : IPage = {
    Index: pageList.length,
    Title: "Untitled", 
    Description: "",
    Created: new Date().toLocaleString(),
    Recent: new Date().toLocaleString(),
    Port: "regular"
  }

  const [template, setTemplate] = useState(false)
  const templateRef = useRef<HTMLDivElement>(null);
  
  /**
   * Acquire page template pop-up on adding new page
   * @param apply 
   * @param e 
   * @returns 
   */
  const handleTemplate : (apply : boolean, eK? : KeyboardEvent, eM? : MouseEvent) => void = (apply, eK, eM) => {
    if (apply) handlePageAdd(newPage)
    else if ((eK && eK?.key !== "Escape") || (eM && templateRef.current && templateRef.current.contains(eM.target as Node))) return 
    setTemplate(false)
  }

  const handleSignout : () => void = () => {
    setUpdate(false)
    dispatch(clearTokenAction())
  }

  /**
   * Renders during unmounting to remove unconnected event listeners for template selection
   */
  useEffect(() => {
    const handleKeyDown = (e : KeyboardEvent) => handleTemplate(false, e, undefined);
    const handleMouseDown = (e : MouseEvent) => handleTemplate(false, undefined, e)
  
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);
  
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    // Holds house icon, Name
    <div className="w-[250px] bg-stone-800 h-screen">
      <div className="ml-3 mt-3">
        <div className="text-slate-300">
          <Icon.FaRegUser className="w-6 h-6 inline pb-1" />
          <span className="ml-3">{username}'s </span>
        </div>
        <ul className="block mt-5 text-slate-400">
          {/* Hold Search and Settings buttons */}
          <li className={listStyle}>
            <button className="flex w-full">
              <Icon.BiSearchAlt className="w-5 h-5 mt-0.5" />
              <span className="ml-3">Search</span>
            </button>
          </li>
          <li className={listStyle}>
            <button className="flex w-full">
              <Icon.IoSettingsOutline className="w-5 h-5 mt-0.5"/>
              <span className="ml-3">Settings</span>
            </button>
          </li>
          {pageList.filter((item : IPage) => item.Port === "star").map((item : IPage, i : number) => <Private key={i} page={item}/>)}
          {/* Holds Getting Started */}
          <li className={listStyle + " mt-8"}>
            <button className="flex w-full">
              <Icon.MdOutlineContactPage className="w-5 h-5 mt-0.5" />
              <span className="ml-3">Getting Started</span>
            </button>
          </li>
          {/* Create New Page */}
          <li className={listStyle}>
            <button className="flex w-full" onClick={() => setTemplate(true)}>
              <Icon.FiPlus className="w-5 h-5 mt-0.5" />
              <span className="ml-3">Add a New Page</span>
            </button>
          </li>
          {/* Prompts Template Page */}
          {template && <Template templateRef={templateRef} handleTemplate={handleTemplate}/>}
          {/* Render Private Page List */}
          {pageList.filter((item : IPage) => item.Port === "regular").map((item : IPage, i : number) => <Private key={i} page={item}/>)}
          {/* Holds Calender, Templates, Trash */}
          <li className={listStyle + " mt-8"}>
            <button className="flex w-full">
              <Icon.SlCalender className="w-5 h-5 mt-0.5" />
              <span className="ml-3">Calender</span>
            </button>
          </li>
          <li className={listStyle}>
            <button className="flex w-full">
              <Icon.RiShapesFill className="w-5 h-5 mt-0.5" />
              <span className="ml-3">Templates</span>
            </button>
          </li>
          <li className={listStyle}>
            <button className="flex w-full">
              <Icon.FaRegTrashCan className="w-5 h-5 mt-0.5" />
              <span className="ml-3">Trash</span>
            </button>
          </li>
          {pageList.filter((item : IPage) => item.Port === "trash").map((item : IPage, i : number) => <Private key={i} page={item}/>)}
          <li className={listStyle}>
            <button className="flex w-full">
              <Icon.IoInformationCircleSharp className="w-5 h-5 mt-0.5" />
              <span className="ml-3">About</span>
            </button>
          </li>
        </ul>
        <div>
          <button 
            className={`${listStyle} text-slate-200`}
            onClick={handleSignout}
          >Signout</button>
        </div>
      </div>
    </div>
  );
}



export default Navbar;
