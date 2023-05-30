import s from "./SaveLoad.module.scss";
import useStore from "../../../store/store";

function SaveLoad(){

    const  saveFlow = useStore(state=>state.onFlowSave);
    const loadFlow = useStore(state=>state.onFlowLoad);
  
    function onFlowSave(){          
          saveFlow();
    }
    function onFlowLoaded(){
            loadFlow();
    }
    return(
        <div className={s.container}>
            <button onClick={onFlowSave}>Save</button>
            <button onClick={onFlowLoaded}>Load</button>
        </div>
    )
}

export default SaveLoad;