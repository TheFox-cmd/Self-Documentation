import React, { useState, useEffect } from 'react';
import {IPage} from '../types';

interface pageProp {
  editPage : (page : IPage) => void,
  page : IPage
}

const Page : React.FC<pageProp> = ({editPage, page}) => {
  const [title, setTitle] = useState(page.Title);
  const [description, setDescription] = useState(page.Description);

  // useEffect(() => {
  //   setTitle(page.Title);
  //   setDescription(page.Description);
  // }, [page])

  const saveChanges = () => {
    const newPage = {
      Title: title, 
      Description: description,
      Created: page.Created,
      Recent: new Date().toLocaleString(),
    }
    editPage(newPage);
  };

  return (
    <div className='flex-1'>
      <input 
        type="text" 
        name="Page Title"
        placeholder="Untitled"
        className="bg-neutral-500 text-zinc-300" 
        key={page.Title}
        defaultValue={page.Title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={saveChanges}
        onKeyDown={(e) => {if (e.key === "Enter") saveChanges()}} 
      />
      <input 
        type="text" 
        name="Page Description"
        className="bg-neutral-500 text-zinc-300" 
        key={page.Description}
        defaultValue={page.Description}
        onChange={(e) => setDescription(e.target.value)}
        onBlur={saveChanges}
        onKeyDown={(e) => {if (e.key === "Enter") saveChanges()}}  
      />
    </div>
  );
}

export default Page;