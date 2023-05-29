
import ReactFlow, { Background } from 'react-flow-renderer';
import { shallow } from 'zustand/shallow';
import useStore from '../store/store';
import ColorChooserNode from "../components/CustomNodes/ColorChooserNode";
import ColorReceiverNode from './CustomNodes/ColorReceiverNode';
import ToUpperCaseNode from './CustomNodes/ToUpperCaseNode';
import TextOutputNode from './CustomNodes/TextOutputNode';
import MathOperationNode from './CustomNodes/MathOperationNode';
import NumberSetterNode from './CustomNodes/NumberSetterNode';

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const nodeTypes = {
  colorSetter: ColorChooserNode,
  colorGetter: ColorReceiverNode,
  textSetter: ToUpperCaseNode,
  textGetter: TextOutputNode,
  mathOperation: MathOperationNode,
  numberSetter: NumberSetterNode
};

function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);

  return (
    <div style={{ height: 1320 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      ><Background></Background></ReactFlow>
    </div>
  );
}

export default Flow;