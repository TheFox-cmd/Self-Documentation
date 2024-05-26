import { useState, useEffect, useRef, useContext } from 'react';
import ContextMenu from './contextMenu'
import UserContext from '../data/userContext';
import { IPage } from '../data/types';

interface templateProp{
  handleTemplate: (apply : boolean, e? : KeyboardEvent) => void
}

const Template : React.FC<templateProp> = ({handleTemplate}) => {
  return (
    <>
      <div className='absolute bg-amber-500 p-2 w-1/2 h-1/2'>
        <button onClick={() => {handleTemplate(false)}}>Cancel</button>
        <button onClick={() => {handleTemplate(true)}}>Apply</button>
      </div>
    </>
  );
}

export default Template;