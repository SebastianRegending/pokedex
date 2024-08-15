let loadedPokemons = [];

async function init() {
    await loadingSpinner();
}

let offset = 0;
const limit = 20;

async function loadingSpinner() {
    document.getElementById('loadingspinnerwrapper').classList.remove('d-none');
    document.getElementById('loader').classList.remove('d-none');
    document.getElementById('body').classList.add('overflow');
    await loadPokemons();
    await waitForImagesToLoad();
    document.getElementById('loadingspinnerwrapper').classList.add('d-none');
    document.getElementById('loader').classList.add('d-none');
    document.getElementById('body').classList.remove('overflow');

}

function waitForImagesToLoad() {
    return new Promise(resolve => {
        let loadedImagesCount = 0;
        const images = document.querySelectorAll('img.profile-img');
        images.forEach(image => {
            if (image.complete) {
                loadedImagesCount++;
            } else {
                image.addEventListener('load', () => {
                    loadedImagesCount++;
                    if (loadedImagesCount === images.length) {
                        resolve();
                    }
                });
                image.addEventListener('error', () => {
                    loadedImagesCount++;
                    if (loadedImagesCount === images.length) {
                        resolve();
                    }
                });
            }
        }
    );
        if (loadedImagesCount === images.length) {
            resolve();
        }
    });
}

async function getPokemonsData() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        const data = await response.json();
        const pokemons = data.results;
        const pokemonDetails = await Promise.all(pokemons.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            return response.json();
        }));
        offset += limit;
        loadedPokemons = loadedPokemons.concat(pokemonDetails);
        return loadedPokemons;
    } catch (error) {
        console.error('Fehler beim Abrufen der Pokemon-Daten:', error);
    }
}

async function loadPokemons() {
    const pokemonsData = await getPokemonsData();
    let content = document.getElementById('content');
    content.innerHTML = '';
    loadedPokemons.forEach((pokemon, index) => {
        const pokemonInfo = {
            name: pokemon.name,
            sprites: pokemon.sprites,
            stats: pokemon.stats,
            types: pokemon.types,
            id: pokemon.id
        };
        content.innerHTML += loadPokemonCards(pokemonInfo, index);
    });
}

function loadPokemonCards(pokemon, cardindex) {
    const { name, sprites, stats, types, id } = pokemon;
    const hp = stats.find(stat => stat.stat.name === 'hp').base_stat;
    const attack = stats.find(stat => stat.stat.name === 'attack').base_stat;
    const defense = stats.find(stat => stat.stat.name === 'defense').base_stat;
    const specialAttack = stats.find(stat => stat.stat.name === 'special-attack').base_stat;
    const specialDefense = stats.find(stat => stat.stat.name === 'special-defense').base_stat;
    const speed = stats.find(stat => stat.stat.name === 'speed').base_stat;
    const typeNames = types.map(type => type.type.name).join(', ');
    const firstTypeName = types.length > 0 ? types[0].type.name : '';
    return loadPokemonCardsHTML(cardindex, firstTypeName, sprites.other.home.front_default, name, typeNames, id, hp, attack, defense, specialAttack, specialDefense, speed);
}

async function loadMorePokemons() {
    document.getElementById('loadingspinnerwrapper').classList.remove('d-none');
    document.getElementById('loader').classList.remove('d-none');
    document.getElementById('body').classList.add('overflow');
    await loadPokemons();
    await waitForImagesToLoad();
    document.getElementById('loadingspinnerwrapper').classList.add('d-none');
    document.getElementById('loader').classList.add('d-none');
    document.getElementById('body').classList.remove('overflow');
}

function searchPokemonCards(searchTerm) {
    const pokemonCards = document.querySelectorAll('.pokemoncard-style');
    const searchTermLowerCase = searchTerm.toLowerCase();
    pokemonCards.forEach(card => {
        const cardName = card.querySelector('.pokemonname').textContent.toLowerCase();
        const cardTypes = card.querySelector('p').textContent.toLowerCase();
        if (searchTerm === '' || cardName.includes(searchTermLowerCase) || cardTypes.includes(searchTermLowerCase)) {
            card.style.display = 'inherit';
        } else {
            card.style.display = 'none';
        }
    });
}

    function loadBigPokeCard(cardindex, firstTypeName, frontImage, name, typeNames, id, hp, attack, defense, specialAttack, specialDefense, speed) {    
    let bigpokecardwrapper = document.getElementById('bigpokecardwrapper');
    bigpokecardwrapper.innerHTML = '';
    bigpokecardwrapper.innerHTML += loadBigPokeCardHTML(cardindex, firstTypeName, frontImage, name, typeNames, id, hp, attack, defense, specialAttack, specialDefense, speed);   
    document.getElementById('bigpokecardwrapper').classList.remove('d-none');
    document.getElementById(`big${cardindex}`).classList.add('bigpokecard-style');
    document.getElementById(`big${cardindex}`).classList.remove('pokemoncard-style');
    document.getElementById('body').classList.add('overflow');
    if (cardindex == 0) {
        document.getElementById('arrowleft').classList.add('hidden');   
    }
    if (cardindex == loadedPokemons.length - 1) {
        document.getElementById('arrowright').classList.add('hidden');            
    }
}



function closeBigImage() {
    document.getElementById('bigpokecardwrapper').classList.add('d-none');
    document.getElementById('body').classList.remove('overflow');
}

function previousPokemon(cardindex) {
    if (cardindex > 0) {
        cardindex--;
        showPokemonCard(cardindex);
        if (cardindex === 0) {
            document.getElementById('arrowleft').classList.add('hidden');            
        }
    } else {
        return;
    }
}

function nextPokemon(cardindex) {
    if (cardindex < loadedPokemons.length - 1) {
        cardindex++;
        showPokemonCard(cardindex);
        if (cardindex === loadedPokemons.length - 1) {
            document.getElementById('arrowright').classList.add('hidden');            
        }
    } else {
        return;
    }
}

function showPokemonCard(cardindex) {
    let currentPokemon = loadedPokemons[cardindex];
    loadBigPokeCard(
        cardindex,
        currentPokemon.types[0].type.name,
        currentPokemon.sprites.other.home.front_default,
        currentPokemon.name,
        currentPokemon.types.map(type => type.type.name).join(', '),
        currentPokemon.id,
        currentPokemon.stats[0].base_stat,
        currentPokemon.stats[1].base_stat,
        currentPokemon.stats[2].base_stat,
        currentPokemon.stats[3].base_stat,
        currentPokemon.stats[4].base_stat,
        currentPokemon.stats[5].base_stat,
    );
}

