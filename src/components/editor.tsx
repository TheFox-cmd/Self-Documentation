// // import { useTheme } from "next-themes" 
// import "@blocknote/core/fonts/inter.css";
// import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
// import { useCreateBlockNote } from "@blocknote/react";
// import { BlockNoteView } from "@blocknote/mantine";
// import "@blocknote/mantine/style.css";

// interface EditorProps {
//   onChange: (value: string) => void;
//   initialContent?: string;
//   editable?: boolean;
// }

// export const Editor = ({ onChange, initialContent, editable }: EditorProps) => {

// //   const editor: BlockNoteEditor = useBlockNote({
// //     editable,
// //     initialContent: initialContent
// //       ? (JSON.parse(initialContent) as PartialBlock[])
// //       : undefined,
// //     onEditorContentChange: (editor) => {
// //       onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
// //     },
// //   });

// const editor = useCreateBlockNote();


//   return (
//     <div>
//         <BlockNoteView 
//         editor={editor}
//         // theme={"dark"}
//         />
//     </div>
//   )

// };


export default {}