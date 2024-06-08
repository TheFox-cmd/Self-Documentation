import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../data/userContext';
import Icon from '../data/react-icons';
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  closestCorners,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import  Editor  from "./editor";

const Page : React.FC = () => {
  const { 
    handlePageEdit,
    handlePageRemove,
    page,
  } = useContext(UserContext)

  const [title, setTitle] = useState(page.Title);
  const [description, setDescription] = useState(page.Description);

  /**
   * Triggers current page render on input
   */
  useEffect(() => {
    setTitle(page.Title);
    setDescription(page.Description);
  }, [page]);

  /**
   * Save page status to private page list
   */
  const handlePageSave = () => {
    const newCurrPage = {
      Index: page.Index,
      Title: title, 
      Description: description,
      Created: page.Created,
      Recent: new Date().toLocaleString(),
      Port: page.Port
    }
    handlePageEdit(newCurrPage);
  };

  return (
    
    <div className='flex-1 w-full h-full '>
      <input 
        type="text" 
        name="Page Title"
        placeholder="Untitled"
        className="bg-neutral-500 text-zinc-300 absolute" 
        key={page.Title}
        defaultValue={page.Title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handlePageSave}
        onKeyDown={(e) => {if (e.key === "Enter") handlePageSave()}} 
      />
      <Editor 
        key={page.Description}
        defaultValue={page.Description}
        onBlur={handlePageSave} 
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={(e) => {if (e.key === "Enter") handlePageSave()}}
      />
    </div>
  );
}

export default Page;




//         key={page.Description}
//         defaultValue={page.Description}
//         onChange={(e) => setDescription(e.target.value)}
//         onBlur={handlePageSave}
//         onKeyDown={(e) => {if (e.key === "Enter") handlePageSave()}}  