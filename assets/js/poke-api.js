const PokeApi = {}

const convertPokeApiDetailToPokemon = (pokeDetail) => {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id

    const types = pokeDetail.types.map(typeSloth => typeSloth.type.name)
    const [ type ] = types;

    pokemon.type = type
    pokemon.types = types
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

PokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then(response => response.json())
            .then(convertPokeApiDetailToPokemon)
}

PokeApi.getPokemon = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then(response => response.json())
        .then(jsonBody => jsonBody.results)
        .then(pokemons => pokemons.map(PokeApi.getPokemonDetail))
        .then(detailRequests => Promise.all(detailRequests))
        .then(pokemonsDetails => pokemonsDetails)
}