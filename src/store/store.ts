import { create } from "zustand";

import {
  Connection,
  Edge,
  Node,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  EdgeChange,
} from "react-flow-renderer";

import {
  updateNodeText,
  updateNodeColor,
  handleConnect,
  addNode,
  setNum,
  setOperationType,
  performMathOperation
} from "./nodeServices";

import initialNodes from "./nodes"
import initialEdges from "./edges";
import { NodeType } from "./nodeTypes";


type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onConnect: OnConnect;
  onEdgesChange: OnEdgesChange;
  updateNodeColor: (nodeId: string, color: string) => void;
  updateNodeText: (nodeId: string, text: string) => void;
  addNode: (type: NodeType) => void;
  mathOperation: (nodeId: string) => void;
  setMathOperationType: (type: string, id: string) => void;
  setNum: (nodeId: string, num: number) => void;
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

    set({ edges: handleConnect(connection, get()) });
  },

  updateNodeColor: (nodeId: string, color: string) => {
    set({
      nodes: updateNodeColor(get().nodes, nodeId, color)
    });
  },

  updateNodeText: (nodeId: string, text: string) => {
    set({
      nodes: updateNodeText(get().nodes, nodeId, text),
    });
  },

  addNode: (type: NodeType) => {
    set((state) => ({
      nodes: [...state.nodes, addNode(get().nodes, type)],
    }));
  },

  mathOperation: (nodeId: string) => {
    set({
      nodes: performMathOperation(get().nodes, nodeId)
    });
  },

  setMathOperationType: (type: string, id: string) => {
    set({
      nodes: setOperationType(get().nodes, id, type)
    })
  },

  setNum: (nodeId: string, num: number) => {
    set({ nodes: setNum(get().nodes, nodeId, num) })
  },

}))

export default useStore;
