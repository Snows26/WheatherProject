import "../style/close.css";
import Seta from "../img/seta.png";

export const Close = (props) => {
  return (
    <div className="close">
      <button className="button-close" onClick={props.funct}>
        <img src={Seta} alt="arrow"></img>
      </button>
    </div>
  );
};
