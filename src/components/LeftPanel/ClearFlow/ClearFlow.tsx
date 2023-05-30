import useStore from "../../../store/store";
import s from "./ClearFlow.module.scss";

function ClearFlow(){

    const clear = useStore((state)=> state.clearFlow);

    return(
        <div className={s.wrapper}>
            <button onClick={()=>{clear()}}>CLEAR</button>
        </div>
    )
}

export default ClearFlow;