import s from "./LeftPanel.module.scss";
import useStore from "../../store/store";
import { nodeType } from "../../store/nodeTypes";
import SaveLoad from "./SaveLoad/SaveLoad";
import ClearFlow from "./ClearFlow/ClearFlow";

function LeftPanel() {
  const addNode = useStore((state) => state.addNode);

  return (
    <div className={s.wrapper}>
      <div className={s.add_node_container}>
        <div className={s.header}>CREATE NODE</div>
        <div className={s.node_list}>
          <section>
            <h3>COLOR</h3>
            <ul>
              <li>
                <button
                  onClick={() => {
                    addNode(nodeType.colorSetter);
                  }}
                >
                  COLOR INPUT
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    addNode(nodeType.colorGetter);
                  }}
                >
                  COLOR OUTPUT
                </button>
              </li>
            </ul>
          </section>
          <section>
            <h3>TEXT</h3>
            <ul>
              <li>
                <button
                  onClick={() => {
                    addNode(nodeType.textSetterUC);
                  }}
                >
                  TEXT INPUT (UC)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    addNode(nodeType.textSetterLC);
                  }}
                >
                  TEXT INPUT (LC)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    addNode(nodeType.textGetter);
                  }}
                >
                  TEXT OUTPUT
                </button>
              </li>
            </ul>
          </section>
          <section>
            <h3>OPERATIONS</h3>
            <ul>
              <li>
                <button
                  onClick={() => {
                    addNode(nodeType.numberSetter);
                  }}
                >
                  NUMBER INPUT
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    addNode(nodeType.mathOperation);
                  }}
                >
                  MATH OPERATION
                </button>
              </li>
            </ul>
          </section>
          <section>
            <h3>API</h3>
            <ul>
              <li>
                <button
                  onClick={() => {
                    addNode(nodeType.userGetter);
                  }}
                >
                  GET USERS
                </button>
              </li>
            </ul>
          </section>
          <section >
            <h3>SETTINGS</h3>
            <div className={s.settings}>
            <SaveLoad></SaveLoad>
            <ClearFlow></ClearFlow>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default LeftPanel;
