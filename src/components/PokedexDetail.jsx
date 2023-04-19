import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PokedexDetail = () => {
  const [pokemonDetail, setPokemonDetail] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => setPokemonDetail(res.data));
  }, [id]);

  return (
    <div>
      <h1>{pokemonDetail.name}</h1>
      <img
        src={pokemonDetail.sprites?.other["official-artwork"].front_default}
        alt=""
      />
    </div>
  );
};

export default PokedexDetail;
