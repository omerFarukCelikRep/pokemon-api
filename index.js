const pokeApi = "https://pokeapi.co/api/v2";

const getAllFirstGenPokemons = async () => {
    try {
        const res = await fetch(`${pokeApi}/pokemon/?limit=151`);
        const data = await res.json();

        return data.results;
    } catch (error) {
        console.error(error);
    }
}

const getPokemonById = async id => {
    try {
        const res = await fetch(`${pokeApi}/pokemon/${id}`);
        const data = await res.json();

        return data;
    } catch (error) {

    }
}

const getPokemon = async ({ url }) => {
    try {
        const res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.error(error);
    }
}
// getPokemonById(1)
//     .then(data => console.log(data));

getAllFirstGenPokemons()
    .then(data =>
        data.forEach(async (pokemon) => {
            const pokemonObject = await getPokemon(pokemon);
            const types = pokemonObject.types.reduce((accTypeList, type) => [...accTypeList, type.type.name], []);
            createPokemonCard({ url: pokemonObject.sprites.other.dream_world.front_default, name: `${pokemonObject.id} - ${pokemonObject.name}`, types: types });
        })
    );

const getAllFirstGenPokemonsByName = async (searchText) => {
    const pokemonList = await getAllFirstGenPokemons();
    return pokemonList.filter(({ name }) => name.trim().toLowerCase().includes(searchText.trim().toLowerCase()));

}


getAllFirstGenPokemons()
    .then(data =>
        data.forEach(async (pokemon) => {
            const pokemonObject = await getPokemon(pokemon);
            const types = pokemonObject.types.reduce((accTypeList, type) => [...accTypeList, type.type.name], []);
            createPokemonCard({ url: pokemonObject.sprites.other.dream_world.front_default, name: `${pokemonObject.id} - ${pokemonObject.name}`, types: types });
        })
    );


// const createPokemonCard = ({ url, name, types }) => {
//     const card = document.createElement("div");
//     card.classList.add("card");
//     const imgContainer = document.createElement("div");
//     imgContainer.classList.add("img-container");
//     const img = document.createElement("img");
//     img.setAttribute("src", url);
//     img.setAttribute("alt", name);
//     imgContainer.append(img);
//     card.append(imgContainer);

//     const cardContent = document.createElement("div");
//     cardContent.className = "card-content";
//     const title = document.createElement("h3");
//     title.innerText = name;
//     const typeListTitle = document.createElement("h4");
//     typeListTitle.innerText = "Types : ";
//     const typeList = document.createElement("ul");
//     [...types].forEach((type) => {
//         const li = document.createElement("li");
//         li.innerText = type;
//         typeList.append(li);
//     });

//     cardContent.append(title);
//     cardContent.append(typeListTitle);
//     cardContent.append(typeList);
//     card.append(cardContent);

//     return card;
// }

const createPokemonCard = ({ url, name, types }) => {
    let listItems = "";
    types.forEach(type => listItems += `<li>${type}</li>`);
    const template = `
    <div class="card">
        <div class="img-container">
            <img src=${url}
                alt=${name}>
        </div>
        <div class="card-content">
            <h3>${name}</h3>
            <h4>Types:</h4>
            <ul>
            ${listItems}
            </ul>
        </div>
    </div>`
    const main = document.querySelector("main");
    main.innerHTML += template;
}

const searchInput = document.querySelector("input[type=search]");

searchInput.addEventListener("input", async (e) => {
    const filteredList = await getAllFirstGenPokemonsByName(e.target.value);

    const main = document.querySelector("main");
    main.innerHTML = "";

    filteredList.forEach(async (pokemon) => {
        const pokemonObject = await getPokemon(pokemon);
        const types = pokemonObject.types.reduce((accTypeList, type) => [...accTypeList, type.type.name], []);
        createPokemonCard({ url: pokemonObject.sprites.other.dream_world.front_default, name: `${pokemonObject.id} - ${pokemonObject.name}`, types: types });
    });
});

const dateSpan = document.querySelector("footer > div > span");
dateSpan.innerHTML = new Date().getFullYear();

// const navList = document.querySelector("nav > ul");
// console.log(navList);