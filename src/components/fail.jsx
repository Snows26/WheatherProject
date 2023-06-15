import "../style/fail.css";
import { imgWind } from "./imgs.jsx";

export const Fail = (props) => {
  return (
    <div className="content-fail">
      <img src={imgWind} alt="img-erro"></img>
      <h1>
        Não encontramos <span>"{props.funct}"</span>
      </h1>
    </div>
  );
};
