import { Handle, NodeProps, Position } from 'react-flow-renderer';
import useStore from '../../store/store';
import { TextSetter } from '../../store/nodeTypes';

export default function TextTransformerNode({ id, data }: NodeProps<TextSetter>) {
  const updateNodeText = useStore((state) => state.updateNodeText);

  const handleTextChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateNodeText(id, evt.target.value)
  }
  return (
    <div style={{ backgroundColor: "#cfe1ff", borderRadius: 10 }}>
      <div style={{ padding: 10 }}>
        <div>
         {data.subType === "upperCase" ? <p>UpperCase transform</p> : <p>LowerCase transform</p>} 
        </div>
        <div>
         
        <textarea
          defaultValue={data.text}
          onChange={handleTextChange}
          className="nodrag"    
        />
        </div>
      
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} onConnect={()=>{updateNodeText(id,data.text)}}/>
    </div>
  );
}
