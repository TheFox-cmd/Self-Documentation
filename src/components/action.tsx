import {IPage} from '../types';

interface actionProp {

}

const Action : React.FC<actionProp> = () => {
  const duplicatePage : (page : IPage) => void = () => {

  }

  const deletePage : (page : IPage) => void = () => {

  }

  return (
    <>
      <div onClick={() => {}}>duplicate</div>
      <div onClick={() => {}}>delete</div>
    </>
  );
}



export default Action;