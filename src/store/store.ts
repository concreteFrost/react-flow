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

import initialNodes, {updateNodeText,updateNodeColor, handleConnect} from "./nodes";
import initialEdges from "./edges";

type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onConnect: OnConnect;
  onEdgesChange: OnEdgesChange;
  updateNodeColor: (nodeId: string, color: string) => void;
  updateNodeText: (nodeId: string, text: string) => void;
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
    const edges = handleConnect(connection, get());
    set({ edges });
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
  }
}))


export default useStore;
