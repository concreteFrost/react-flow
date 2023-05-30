import {Connection, Edge, addEdge, Node} from "react-flow-renderer"


export function handleConnect(connection: Connection, state: any): Edge[] {
    const target = connection.target
    const targetNode = state.nodes.find((node: Node) => node.id === target);
    if (targetNode && targetNode.data?.allowsMultipleConnection === false) {
      const isTargetConnected = state.edges.some((edge: Edge) => edge.target === target);
      if (isTargetConnected) {
        return state.edges;
      }
    }
  
    return addEdge(connection, state.edges);
  }