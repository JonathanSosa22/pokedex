import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonCard from "./PokemonCard";
import { useNavigate } from "react-router-dom";

const Pokedex = () => {
  const userName = useSelector((state) => state.name);
  const [pokedex, setPokedex] = useState([]);
  const navigate = useNavigate();
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1281")
      .then((res) => setPokedex(res.data.results));
  }, []);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/type/`)
      .then((res) => setTypes(res.data.results));
  }, [types]);

  const [page, setPage] = useState(1);
  const pokemonPerPage = 10;
  const lastIndex = page * pokemonPerPage;
  const firstIndex = lastIndex - pokemonPerPage;

  const pokemonPaginated = pokedex?.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(pokedex?.length / pokemonPerPage);

  const numbersPage = [];
  for (let i = 1; i <= totalPages; i++) {
    numbersPage.push(i);
  }

  const searchPokemon = () => {
    navigate(`/pokedex/${pokemonName.toLowerCase()}`);
  };

  const filterType = (e) => {
    const url = e.target.value;
    axios.get(url).then((res) => setPokedex(res.data.pokemon));
  };

  return (
    <div>
      <h1>Pokedex</h1>
      <h2>Welcome {userName}!</h2>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
      />
      <button onClick={searchPokemon}>Search</button>
      <select onChange={filterType} name="" id="">
        {types.map((pokeType) => (
          <option key={pokeType.name} value={pokeType.url}>
            {pokeType.name}
          </option>
        ))}
      </select>
      <div className="pokedex-card">
        {pokemonPaginated?.map((pokemon) => (
          <ul
            key={pokemon?.pokemon?.url ? pokemon?.pokemon?.url : pokemon?.url}
          >
            <li>
              <PokemonCard
                url={
                  pokemon?.pokemon?.url ? pokemon?.pokemon?.url : pokemon?.url
                }
                key={
                  pokemon?.pokemon?.url ? pokemon?.pokemon?.url : pokemon?.url
                }
              />
            </li>
          </ul>
        ))}
      </div>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev Page
        </button>
        {numbersPage.map((numb) => (
          <button key={numb} onClick={() => setPage(numb)}>
            {numb}
          </button>
        ))}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Pokedex;
