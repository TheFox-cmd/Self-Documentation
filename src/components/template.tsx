import { RefObject } from 'react';

interface templateProp{
  templateRef : RefObject<HTMLDivElement>,
  handleTemplate: (apply : boolean, e? : KeyboardEvent) => void
}

const Template : React.FC<templateProp> = ({ templateRef, handleTemplate }) => {
  return (
    <div 
      className='absolute bg-amber-500 p-2 w-1/2 h-1/2'
      ref={templateRef}
    >
      <button onClick={() => {handleTemplate(false)}}>Cancel</button>
      <button onClick={() => {handleTemplate(true)}}>Apply</button>
    </div>
  );
}

export default Template;