import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeName } from "../store/slices/name.slice";
import pokedexHome from "../assets/img/pokedexHomeEntrenador.png";
import pokedexTitle from "../assets/img/pokedexHome.svg";
import ToggleDarkMode from "./ToggleDarkMode";

const InputName = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const enterName = () => {
    dispatch(changeName(userName));
    navigate("/pokedex");
  };

  return (
    <div className="inputName">
      <div>
        <img className="img-title" src={pokedexTitle} alt="" />
        <h1>Hello trainer!</h1>
        <img className="img-entrenador" src={pokedexHome} alt="" />
      </div>
      <div>
        <input
          placeholder="Pon Tu Nombre"
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
        <button onClick={enterName}>Enter</button>
      </div>
      <div>
        <ToggleDarkMode />
      </div>
    </div>
  );
};

export default InputName;
