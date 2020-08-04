const searchBar = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
const result = document.getElementById("results");

//search pokemon by id or name
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
// build the div contains pokemon info
const makeDiv = (name, height, weight, picture, over, types) => {
  let pokemonTypes = " ";
  for (let i = 0; i < types.length; i++) { //add pokemon type names to info
    pokemonTypes += `<div class='type' id='${types[i].type.name}'>type ${i + 1}: ${types[i].type.name}</div>`;
  }
  const htmlText = `
  <div class="pokemonContainer">
  <div>Name: ${name}</div>
  <div>height: ${height}</div>
  <div>weight: ${weight}</div>
  ${pokemonTypes}
  <div>picture: <img id="pokemonPic" src="${picture}"/></div>
  </div>
  `;
  result.innerHTML = htmlText;
  
  // when mouse hovers image pokemon turns around
  const image = document.getElementById("pokemonPic");
    image.onmouseover= () => image.src=over;
    image.onmouseout= () => image.src=picture;
}

searchButton.addEventListener("click", () =>  searchPokemon(searchBar.value)); //search button activates pokemon search

// clicking a types creates a list of all pokemon with the same type
result.addEventListener('click', async (e) => {
  const target = e.target;
  if (target.className === 'type') {
    let pokemons = document.createElement('div'); // element contains all the clicked type's pokemons
    for (let i = 1; i <= 807; i++){
      const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${i}`);
      console.log(i);
      for(let j = 0; j < data.types.length; j++) {
          if (data.types[j].type.name == target.id) {
              pokemon = document.createElement('p');
              pokemon.innerHTML = data.name;
              pokemon.className = 'pokemons';
              pokemons.appendChild(pokemon);
          }
      }                 
  }
result.appendChild(pokemons); // clicked type's pokemons list appears at once
}

// when a pokemon from the clicked type's list is clicked, it appears as the searched pokemon
console.log(target.className);
if (target.className === 'pokemons') {
  searchPokemon(target.innerHTML);
}
})