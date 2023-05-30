import { ColorSetter, NodeType, NumberSetter, TextSetter } from "./nodeTypes";
import { Node, Connection, Edge, addEdge } from 'react-flow-renderer';
import fetchUsers from "../api/fetchUsers";

function matchNode(nodes:Node[], nodeId : string) : Node{
  return nodes.find((n : Node)=>{return n.id === nodeId})!
}

export function addNode(nodes: Node[], type: NodeType): Node[] {

  const newNode = {
    id: nodes.length.toString(),
    type: type.type,
    data: type.data,
    position: { x: 0, y: 0 },
  }
  return [...nodes,newNode] 
}

export function updateNodeColor(nodes: Node[], nodeId: string, color: string): Node[] {

  const match = matchNode(nodes,nodeId);
  match.data = {...match.data,color}
  
  return nodes.map((n : Node)=>{return n});
}

export function updateNodeText(nodes: Node[], edg:Edge[], nodeId: string, text: string): Node[] {

const match = matchNode(nodes,nodeId);

  edg.forEach(e => {
    if (e.source === nodeId) {
        const matchTargetNode = nodes.find((x: Node) => x.id === e.target)!
        matchTargetNode.data ={...matchTargetNode.data, text : match.data.subType === "upperCase" ? text.toUpperCase() : text.toLowerCase()}     
    }
})
 

  return nodes.map((n:Node)=> n);
}

export function setNum(nodes: Node[], nodeId: string, payload: number): Node[] {

  const match = matchNode(nodes,nodeId)
  match.data = {...match.data,number : payload};

  return nodes.map((n:Node)=> n);
}

export function setOperationType(nodes: Node[], nodeId: string, payload: string): Node[] {

  const match = matchNode(nodes,nodeId)

  
  match.data = {...match.data,operationType : payload};

  return nodes.map((n:Node)=> n);
}

export function performMathOperation(nodes: Node[],edg : Edge[], nodeId: string): Node[] {

  let numsArray: any = []
  const match = matchNode(nodes, nodeId);

  edg.forEach(e => {
      if (e.target === match.id) {
          const matchSourceNode = nodes.find((x: Node) => x.id === e.source)!
          numsArray.push(matchSourceNode.data.number)
      }
  })

  let res = 0;

  switch(match.data.operationType){
    case "addition" : res = numsArray.reduce((a:number, b:number)=>a+b,0);
    break;
    case "subtraction" : res = numsArray.reduce((a:number, b:number)=>a-b,0);
    break;
  }
  match.data = {...match.data ,number: res };

  return nodes.map((n:Node)=> n);

}

export async function getUsers(nodeId : string, nodes : Node[]) : Promise<Node[]>{
  const users = await fetchUsers();
  const match = matchNode(nodes,nodeId);

  match.data = {...match.data, users};
  return nodes.map((n:Node)=> n);
}

