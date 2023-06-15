import "../style/details.css";

export const Details = (props) => {
  return (
    <div className="content">
      <h1 className="name-place">{`${props.place}, ${props.placeSiglas}`}</h1>
      <h1 className="temp">
        {Math.round(props.temp, 4)}
        <span>°C</span>
      </h1>
      <h2 className="detail-title">Detalhes</h2>
      <p>{`Sensacão térmica: ${Math.round(props.feelsLike, 2)}°C`}</p>
      <p>{`Ventos: ${props.wind}Km/h`}</p>
      <p>{`Umidade: ${props.humidity}%`}</p>
      {props.imgtemp}
    </div>
  );
};
