import "../style/sugestion.css";
import Cities from "../json/cities.json";
import { useEffect } from "react";
import { useState } from "react";

export const Sugestion = (props) => {
  const [SG, setSG] = useState([]);
  // const [Key, setKey] = useState("");

  const joinCitiesWithStates = () => {
    const SG = [];
    //  const Key = [];
    const cities = Cities.cities;
    const states = Cities.states;

    cities.forEach((city) => {
      const stateId = city.state_id;
      //   const stateKey = city.id;
      const cityName = city.name;

      states.forEach((state) => {
        const stateIdKey = Object.keys(state)[0];
        if (stateIdKey === String(stateId)) {
          const stateName = state[stateIdKey];
          SG.push(`${cityName}, ${stateName}`);
          // Key.push(stateKey);
          // setKey(Key);
          setSG(SG);
        }
      });
    });
  };

  useEffect(() => {
    joinCitiesWithStates();
  }, []);

  const filtro = SG.filter((cidade) => {
    return (
      !!props.value &&
      cidade.toLocaleLowerCase().includes(props.value.toLocaleLowerCase())
    );
  }).slice(0, 4);

  // Insert sugeston

  return (
    <div className="sugestion">
      <ul>
        {props.status
          ? ""
          : filtro.map((city) => (
              <li>
                <button onClick={props.functInset} value={city}>
                  {city}
                </button>
              </li>
            ))}
      </ul>
    </div>
  );
};
