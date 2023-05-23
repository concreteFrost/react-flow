import { Node, Connection, Edge, addEdge } from 'react-flow-renderer';
import { textGetter,colorGetter } from './nodeTypes';

export default [
  {
    id: '1',
    type: 'colorChooser',
    data: { color: '#4FD1C5'},
    position: { x: 250, y: 25 },
  },
  {
    id: '1a',
    type: 'colorChooser',
    data: { color: '#4FD1C5'},
    position: { x: 400, y: 25 },
  },
  {
    id: '2',
    type: 'colorReceiver',
    data  : colorGetter
    ,position: { x: 100, y: 125 }
  },
  {
    id: '3',
    type: 'colorReceiver',
    data:  colorGetter,
    position: { x: 250, y: 250 },
  },
  {
    id: '4',
    type: 'textSetter',
    data: { text: '', subType:'upperCase'},
    position: { x: 600, y: 25 },
  },
  {
    id: '5',
    type: 'textSetter',
    data: { text: '', subType:'lowerCase'},
    position: { x: 800, y: 25 },
  },
  {
    id: '6',
    type: 'textGetter',
    data: textGetter ,
    position: { x: 600, y: 200 },
  },
] as Node[];


export function handleConnect(connection: Connection, state: any): Edge[] {
  const { source, target } = connection;
  const targetNode = state.nodes.find((node : Node) => node.id === target);
  if (targetNode && targetNode.data?.allowsMultipleConnection === false) {
    const isTargetConnected = state.edges.some((edge : Edge) => edge.target === target);
    if (isTargetConnected) {
      return state.edges;
    }
  }

  return addEdge(connection, state.edges);
}

export function updateNodeColor(nodes : Node[], nodeId : string, color : string): Node[]{
   return nodes.map((node) => {
    if (node.id === nodeId) {
      node.data = { ...node.data, color };
    }
    return node;
  })
}

export function updateNodeText(nodes: Node[], nodeId: string, text: string): Node[] {
  return nodes.map((node) => {
    if (node.id === nodeId) {
      return {
        ...node,
        data: {
          ...node.data,
          text,
        },
      };
    }
    return node;
  });
}