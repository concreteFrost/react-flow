import { Handle, NodeProps, Position , Node
} from "react-flow-renderer";
import { UserGetter } from "../../store/nodeTypes";
import useStore from "../../store/store";
import { useEffect } from "react";


interface User {
  id: number;
  name: string;
}

export default function UserGetterNode({ id, data }: NodeProps<UserGetter>) {
  const getUsers = useStore((state) => state.getUsers);
  const nodes = useStore((state)=>state.nodes);
  const updateNodeText = useStore((state)=> state.updateNodeText);

  useEffect(()=>{
    getUsers(id)
  },[])

  function handleConnect(e : any){
    const concatUsers = data.users.map((user : User)=> JSON.stringify(user.name)).join(" ");
    updateNodeText(id,concatUsers)
  }

  return (
    <div style={{ backgroundColor: "#d4cd9a", borderRadius: 10 }}>
      <div style={{ padding: 20 }}>
        <div>
          <p>USERS</p>
        </div>
        <ul>
          {data.users.length > 0
            ? data.users.map((user: User) => {
                return (
                  <li key={user.id}>
                    {user.id} : {user.name}
                  </li>
                );
              })
            : null}
        </ul>
      </div>
      <Handle type="source" position={Position.Bottom} onConnect={handleConnect}  />
    </div>
  );
}
