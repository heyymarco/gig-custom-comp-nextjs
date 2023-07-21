import { default as React, useCallback, useEffect, useMemo, useState } from "react";
import { EditorPlugin, ToolbarPlugin, WysiwygEditor, WysiwygEditorProps, WysiwygEditorState } from "./editors/WysiwygEditor";
import { $getSelection, COMMAND_PRIORITY_EDITOR, DecoratorNode, EditorConfig, LexicalCommand, LexicalEditor, LexicalNode, NodeKey, createCommand } from "lexical";
import { Basic, BasicProps, ButtonIcon, ButtonIconProps, Group } from "@reusable-ui/components";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { typos } from "@reusable-ui/core";



interface CounterProps
    extends
        BasicProps
{
    initialCount ?: number
}
const Counter = ({initialCount = 0, ...restBasicProps}: CounterProps) => {
    const [count, setCount] = useState(initialCount);
    return (
        <Basic
            {...restBasicProps}
            style={useMemo(() => ({
                display: 'inline-block',
                textAlign: 'center',
                fontWeight: typos.fontWeightSemibold,
                fontSize  : typos.fontSizeLg,
            }), [])}
            mild={true}
            theme='success'
        >
            <p>{count}</p>
            <Group>
                <ButtonIcon icon='remove_circle' onClick={() => setCount((current) => current - 1)}>
                    Decrease
                </ButtonIcon>
                <ButtonIcon icon='add_circle' onClick={() => setCount((current) => current + 1)}>
                    Increase
                </ButtonIcon>
            </Group>
        </Basic>
    )
}
class CounterNode extends DecoratorNode<React.ReactNode> {
    __count : number;
    
    static getType(): string {
        return 'counter';
    }
    static clone(node: CounterNode): CounterNode {
        return new CounterNode(node.__count, node.__key);
    }
    
    constructor(count?: number, key?: NodeKey) {
        super(key);
        this.__count = count ?? 0;
    }
    createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
        return document.createElement('div');
    }
    updateDOM(_prevNode: unknown, _dom: HTMLElement, _config: EditorConfig): boolean {
        return false;
    }
    decorate(editor: LexicalEditor, config: EditorConfig): React.ReactNode {
        return <Counter initialCount={this.__count} />
    }
}
export function $createCounterNode(count = 0): CounterNode {
    return new CounterNode(count);
}
export function $isCounterNode(node: LexicalNode | null | undefined): node is CounterNode {
    return node instanceof CounterNode;
}
export function $insertNodeToNearestRoot(node: LexicalNode) {
    const selection = $getSelection();
    selection?.insertNodes([node]);
}



const INSERT_COUNTER_COMMAND: LexicalCommand<number|undefined> = createCommand();
interface ButtonInsertCounterProps extends ButtonIconProps {}
const ButtonInsertCounter = (props: ButtonInsertCounterProps) => {
    // contexts:
    const [editor] = useLexicalComposerContext();
    
    useEffect(() => {
        return editor.registerCommand(
            INSERT_COUNTER_COMMAND,
            (payload) => {
                const counterNode = $createCounterNode(payload);
                $insertNodeToNearestRoot(counterNode);
                return true;
            },
            COMMAND_PRIORITY_EDITOR
        );
    }, [editor]);
    
    return (
        <ButtonIcon
            {...props}
            icon='av_timer'
            onClick={() => editor.dispatchCommand(INSERT_COUNTER_COMMAND, 0)}
        />
    )
}



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
    // console.log(JSON.stringify(description));
    
    
    
    const nodes = useCallback<Required<WysiwygEditorProps>['nodes']>((nodes) => [
        ...nodes,
        CounterNode,
    ], []);
    
    
    
    return (
        <WysiwygEditor
            // values:
            value={description}
            onChange={setDescription}
            
            
            
            // plugins:
            nodes={nodes}
        >
            <ToolbarPlugin className='solid' theme='primary'>
                {(children, basicVariantProps) => <>
                    {...children}
                    <ButtonInsertCounter {...basicVariantProps} />
                </>}
            </ToolbarPlugin>
            <EditorPlugin
                // accessibilities:
                placeholder='Type product description here...'
            />
        </WysiwygEditor>
    );
}