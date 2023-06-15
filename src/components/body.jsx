import "../style/corpo.css";
import {
  imgLocal,
  imgLupa,
  imgSun,
  imgMoon,
  imgSunAndCloud,
  imgMoonAndCloud,
  imgCloud,
  imgBrokenCloud,
  imgWind,
  imgRainCloud,
  imgSunRain,
  imgStorm,
  imgSnowy,
} from "./imgs";
import { Sugestion } from "./sugestion";
import { Details } from "./details";
import { Close } from "./close";
import { Fail } from "./fail";
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

export const Body = () => {
  // States for serch input
  const [valor, setValor] = useState("");
  const [valorFixo, setValorFixo] = useState("");

  // States for details
  const [temp, setTemp] = useState("");
  const [place, setNamePlace] = useState("");
  const [placeSigla, setPlaceSigla] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [wind, setWind] = useState("");
  const [humidity, setHumidity] = useState("");
  const [imgTemp, setImgTemp] = useState("");

  // Animation with useSpring
  const [startAnimation, setStartAnimation] = useState(false);
  const [tempAnimationParent, setTempAnimationParent] = useState(0);
  const [tempAnimationChild, setTempAnimationChild] = useState(0);

  // States for error
  const [erro, setErro] = useState(false);

  // Search with enter
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        if (valor !== false) {
          load([valor]);
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  // Insert text in input
  const handleSugestion = (event) => {
    setValor(event.target.value);
  };

  // Insert sugestion
  const handleInsert = (event) => {
    setValor(event.target.value);
  };

  // Insert value fix in component erro
  const handleSearch = () => {
    setValorFixo(valor);
  };

  // All animation initialization process
  const handleClick = () => {
    if (startAnimation === false) {
      setStartAnimation(!startAnimation);
      setTempAnimationParent(0);
      setTempAnimationChild(600);
    } else {
    }
  };

  const closeAnimation = () => {
    if (startAnimation === true) {
      setStartAnimation(!startAnimation);
      setTempAnimationParent(600);
      setTempAnimationChild(0);
    } else {
    }
  };

  const sugestionAnimation = useSpring({
    opacity: startAnimation ? 0 : 1,
    from: { opacity: 1 },
    delay: 900,
  });

  const arrowAnimation = useSpring({
    translateY: startAnimation ? 10 : -45,
    from: { translateY: -45 },
    delay: 600,
  });

  const parentAnimation = useSpring({
    height: startAnimation ? 500 : 50,
    from: { height: 50 },
    config: { duration: 100 },
    delay: tempAnimationParent,
  });

  const childAnimation = useSpring({
    opacity: startAnimation ? 1 : 0,
    from: { opacity: 0 },
    delay: tempAnimationChild,
  });

  // Processing API data
  const load = async (city) => {
    try {
      const linkBruto = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c7e187e83bc19de8320ca57d873a31f8&lang=pt_br`
      );

      if (linkBruto.status === 404) {
        setErro(true);
        handleSearch();
        handleClick();
      } else if (linkBruto.status === 200) {
        setErro(false);
        const dadosJson = await linkBruto.json();

        const img = dadosJson.weather[0].icon;

        setTemp(dadosJson.main.temp);
        setNamePlace(dadosJson.name);
        setPlaceSigla(dadosJson.sys.country);
        setFeelsLike(dadosJson.main.feels_like);
        setWind(dadosJson.wind.speed);
        setHumidity(dadosJson.main.humidity);

        const imgMappings = {
          "01d": { src: imgSun, width: "310px" },
          "01n": { src: imgMoon, width: "269px" },
          "02d": { src: imgSunAndCloud, width: "317px" },
          "02n": {
            src: imgMoonAndCloud,
            width: "317px",
            top: "155px",
            left: "50px",
          },
          "03n": { src: imgCloud, width: "300px" },
          "03d": { src: imgCloud, width: "300px" },
          "04n": { src: imgBrokenCloud, width: "315px" },
          "04d": { src: imgBrokenCloud, width: "315px" },
          "09d": { src: imgRainCloud, width: "293px", top: "200px" },
          "09n": { src: imgRainCloud, width: "293px", top: "200px" },
          "10d": { src: imgSunRain, width: "261px", top: "205px" },
          "11d": { src: imgStorm, width: "293px", top: "208px" },
          "11n": { src: imgStorm, width: "293px", top: "208px" },
          "13d": { src: imgSnowy, width: "320px" },
          "13n": { src: imgSnowy, width: "320px" },
          "50d": { src: imgWind, width: "246px" },
          "50n": { src: imgWind, width: "246px" },
        };

        const selectedImg = imgMappings[img];
        if (selectedImg) {
          setImgTemp(
            <img
              src={selectedImg.src}
              alt="icon-weather"
              style={{
                width: selectedImg.width,
                top: selectedImg.top,
                left: selectedImg.left,
              }}
            />
          );
        }

        handleClick();
        console.log(dadosJson.weather[0].icon);
      }
    } catch (error) {
      setErro(true);
    }
  };

  // JSX
  return (
    <div>
      <animated.div className={`corpo`} style={parentAnimation}>
        <div className="sub-search">
          <img src={imgLocal} alt="icon local"></img>
          <input
            className="input"
            placeholder="Enter your local"
            value={valor}
            onChange={handleSugestion}
          />
          <button
            onClick={() => {
              load([valor]);
            }}
            className="button"
          >
            <img src={imgLupa} alt="icon search"></img>
          </button>
        </div>
        <animated.div className="main" style={childAnimation}>
          {erro ? (
            <Fail style={childAnimation} city={valor} funct={valorFixo} />
          ) : (
            <Details
              style={childAnimation}
              place={place}
              placeSiglas={placeSigla}
              temp={temp}
              feelsLike={feelsLike}
              wind={wind}
              humidity={humidity}
              imgtemp={imgTemp}
            />
          )}
        </animated.div>
      </animated.div>
      <animated.div style={sugestionAnimation}>
        <Sugestion
          status={startAnimation}
          value={valor}
          functInset={handleInsert}
        />
      </animated.div>
      <animated.div style={arrowAnimation}>
        <Close funct={closeAnimation} />
      </animated.div>
    </div>
  );
};
