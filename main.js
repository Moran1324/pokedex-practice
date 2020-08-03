const searchBar = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
const result = document.getElementById("results");

const searchPokemon = async (pokemonId = 6) => {
  try {
  const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  console.log(data);
  makeDiv(data.name, data.height, data.weight, data.sprites.front_default, data.sprites.back_default, data.types);
  searchBar.value = "";
  searchBar.focus();
  } catch(e) {
    result.innerHTML = "";
    result.innerHTML = "Pokemon Not Found";
    console.log(e);
  }
  };

const makeDiv = (name, height, weight, picture, over, types) => {
  let pokemonTypes = " ";
  for (let i = 0; i < types.length; i++) {
    pokemonTypes += types[i].type.name + " ";
  }
  const htmlText = `
  <div class="pokemonContainer">
  <div>Name: ${name}</div>
  <div>height: ${height}</div>
  <div>weight: ${weight}</div>
  <div>types: ${pokemonTypes} </div>
  <div>picture: <img id="pokemonPic" src="${picture}"/></div>
  </div>
  `;
  result.innerHTML = htmlText;
  
  const image = document.getElementById("pokemonPic");
    image.onmouseover= () => image.src=over;
    image.onmouseout= () => image.src=picture;
}

searchButton.addEventListener("click", () =>  searchPokemon(searchBar.value));
