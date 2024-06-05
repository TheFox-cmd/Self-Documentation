import { RefObject } from 'react';
import Icon from "../data/react-icons";

interface templateProp{
  templateRef : RefObject<HTMLDivElement>,
  handleTemplate: (apply : boolean, e? : KeyboardEvent) => void
}

const Template : React.FC<templateProp> = ({ templateRef, handleTemplate }) => {

  const listStyle = "p-1 flex w-full hover:bg-zinc-200 hover:bg-opacity-25 rounded-lg pr-2  ";
  return (
    <div 
      className='absolute bg-zinc-700 rounded p-2 w-auto h-auto text-neutral-300 pr-3'
      ref={templateRef}
    >
      <li className={listStyle} onClick={() => {handleTemplate(true)}}><Icon.IoCheckmarkCircle className="w-5 h-5 mt-0.5 mr-1.5" /><span className="">Apply</span></li>
      <li className={listStyle} onClick={() => {handleTemplate(false)}}><Icon.MdCancel className="w-5 h-5 mt-0.5 mr-1.5" /><span className="">Cancel</span></li>
    </div>
  );    
}

export default Template;