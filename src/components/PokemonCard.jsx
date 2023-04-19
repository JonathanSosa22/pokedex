import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PokemonCard = ({ url }) => {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    axios.get(url).then((res) => setPokemon(res.data));
  }, []);

  return (
    <div className="pokemon-card">
      <Link className="link" to={`/pokedex/${pokemon.id}`}>
        <h1>{pokemon.name}</h1>
        <img
          src={pokemon.sprites?.other["official-artwork"].front_default}
          alt=""
        />
      </Link>
    </div>
  );
};

export default PokemonCard;
