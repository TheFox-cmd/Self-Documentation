import { BlockNoteEditor, type PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { IPage } from '../data/types';


interface EditorProps {
  onChange: (e : any) => void;
  onBlur: () => void;
  onKeyDown: (e : any) => void;
  initialContent?: string;
  editable?: boolean;
  key: string;
  defaultValue?: string;
}

const Editor: React.FC<EditorProps> = ({
  onChange,
  onBlur,
  onKeyDown,
  editable,
  key,
  defaultValue,
}) => {
  const editor: BlockNoteEditor = useCreateBlockNote ({
    // initialContent: initialContent 
    // ? (JSON.parse(initialContent) as PartialBlock[])
    // : undefined,
  });
  return (
    <div className="flex text-white items-center justify-center content-center w-96">
      <BlockNoteView
      editor={editor}
      editable={editable}
      theme="light"
      defaultValue={defaultValue}
      onChange={ () => onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      key={key}
      />
    </div>
  )
}



export default Editor;