
import ReactFlow from 'react-flow-renderer';
import { shallow } from 'zustand/shallow';
import useStore from '../store/store';
import ColorChooserNode from "../components/CustomNodes/ColorChooserNode";

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const nodeTypes = { colorChooser: ColorChooserNode };

function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);
  console.log(edges)
  return (
    <div style={{ height: 1000 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      />
    </div>
  );
}

export default Flow;