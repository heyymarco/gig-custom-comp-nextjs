import { useState } from "react";
import { EditorPlugin, ToolbarPlugin, WysiwygEditor, WysiwygEditorState } from "./editors/WysiwygEditor";



export const SampleWysiwygEditor = () => {
    const [description     , setDescription     ] = useState<WysiwygEditorState|null>(() => {
        try {
            return JSON.parse(
`{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Demo HTML Editor","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"This is an awesome HTML editor.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"It's safe. Only limited kind of <element>s are allowed. No malicious code injection attacks are possible.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`
            );
        }
        catch {
            return null;
        } // try
    });
    console.log(JSON.stringify(description));
    
    
    
    return (
        <WysiwygEditor
            // values:
            value={description}
            onChange={setDescription}
        >
            <ToolbarPlugin className='solid' theme='primary' />
            <EditorPlugin
                // accessibilities:
                placeholder='Type product description here...'
            />
        </WysiwygEditor>
    );
}