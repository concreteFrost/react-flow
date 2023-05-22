import { create } from 'zustand';
import {
  Connection,
  Edge,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  EdgeChange

} from 'react-flow-renderer';

import initialNodes from './nodes';
import initialEdges from './edges';

type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onConnect: OnConnect;
  onEdgesChange: OnEdgesChange;
  updateNodeColor: (nodeId: string, color: string) => void;
};

export type ColorNode = {
    color: string;
    children: Array<object>;
  };

const useStore = create<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });

  },
  
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges), 
    });
  },
  
  updateNodeColor: (nodeId: string, color: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, color };
         
        }
        return node;
      }),
    });
  }
}));

export default useStore;
