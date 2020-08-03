const searchBar = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
const result = document.getElementById("result");

const searchPokemon = async (pokemonId = 3) => {
  const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  console.log(data)
};
// searchPokemon();


searchButton.addEventListener("click", () => { searchPokemon(searchBar.value);} );
