import { Handle, NodeProps, Position } from 'react-flow-renderer';
import useStore, { ColorNode } from '../../store/store';

export default function ColorChooserNode({ id, data }: NodeProps<ColorNode>) {
  const updateNodeColor = useStore((state) => state.updateNodeColor);
  const edg = useStore(state => state.edges)

  const handleColorChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    edg.forEach(e => {
      if (e.source === id) {
        updateNodeColor(e.target, evt.target.value)
      }
    })
  };



  return (
    <div style={{ backgroundColor: data.color, borderRadius: 10 }}>
      <Handle type="target" position={Position.Top} />
      <div style={{ padding: 20 }}>
        <input
          type="color"
          defaultValue={data.color}
          onChange={handleColorChange}
          className="nodrag"
        />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
