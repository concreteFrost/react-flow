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
  addNode,
  setNum,
  setOperationType,
  performMathOperation,
  getUsers,
} from "./nodeServices";

import { handleConnect } from "./edgesServices";
import initialNodes from "./nodes";
import initialEdges from "./edges";
import { NodeType } from "./nodeTypes";
import fetchUsers from "../api/fetchUsers";

type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onConnect: OnConnect;
  onEdgesChange: OnEdgesChange;
  onFlowSave: () => void;
  onFlowLoad: () => void;
  clearFlow: () => void;
  updateNodeColor: (nodeId: string, color: string) => void;
  updateNodeText: (nodeId: string, text: string) => void;
  addNode: (type: NodeType) => void;
  mathOperation: (nodeId: string) => void;
  setMathOperationType: (type: string, id: string) => void;
  setNum: (nodeId: string, num: number) => void;
  getUsers: (nodeId: string) => void;
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

  clearFlow: () => {
    set({ nodes: initialNodes });
  },

  addNode: (type: NodeType) => {
    set({
      nodes: addNode(get().nodes, type),
    });
  },

  onFlowSave: () => {
    const flow = get().nodes;
    const edges = get().edges;
    localStorage.setItem("nodes", JSON.stringify(flow));
    localStorage.setItem("edges", JSON.stringify(edges));
  },

  onFlowLoad: () => {
    const savedNodes = localStorage.getItem("nodes");
    const savedEdges = localStorage.getItem("edges");
    if (savedNodes && savedEdges) {
      const parsedNodes = JSON.parse(savedNodes);
      const parsedEdges = JSON.parse(savedEdges);

      set({ nodes: parsedNodes, edges: parsedEdges });
    }
  },

  updateNodeColor: (nodeId: string, color: string) => {
    set({
      nodes: updateNodeColor(get().nodes, nodeId, color),
    });
  },

  updateNodeText: (nodeId: string, text: string) => {
    set({
      nodes: updateNodeText(get().nodes, get().edges, nodeId, text),
    });
  },

  mathOperation: (nodeId: string) => {
    set({
      nodes: performMathOperation(get().nodes, get().edges, nodeId),
    });
  },

  setMathOperationType: (type: string, id: string) => {
    set({
      nodes: setOperationType(get().nodes, id, type),
    });
  },

  setNum: (nodeId: string, num: number) => {
    set({ nodes: setNum(get().nodes, nodeId, num) });
  },

  getUsers: async (nodeId: string) => {
    set({ nodes: await getUsers(nodeId, get().nodes) });
  },
}));

export default useStore;
