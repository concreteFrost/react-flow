import axios from "axios";

 const fetchUsers=async()=>{
    let users = []
    try{
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        users = response.data;  
        
    }
    catch(error){
        console.log("Error fething users",error)
    }

    return users;
}

export default fetchUsers;