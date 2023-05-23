import React from "react";
import s from "./AddNode.module.scss"

function AddNode(){
    return(<div className={s.wrapper}>
        <div className={s.add_node_container}>
        <div className={s.header}>CREATE NODE</div>
        <div className={s.node_list}>
        <section>
            <h3>COLOR</h3>
            <ul>
                <li><button>COLOR INPUT</button></li>
                <li><button>COLOR OUTPUT</button></li>
            </ul>
        </section>
        <section>
            <h3>TEXT</h3>
            <ul>
                <li><button>TEXT INPUT</button></li>
                <li><button>TEXT OUTPUT</button></li>
            </ul>
        </section>
        </div>
      
        </div>
       
    </div>)
}

export default AddNode;