const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [ type ] = types
    
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon

}
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response)=> response.json())// pega a url com response e retorna uma response.json
    .then(convertPokeApiDetailToPokemon)                

}
// função que devolve uma string query no endpoint
pokeApi.getPokemons = (offset = 0, limit = 5) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}` // link da api
    return fetch(url)
    .then((response) => response.json()) // retorna um http response para json
    .then ((jsonBody) => jsonBody.results) // retorna o resultado do json com varios detalhes, mas o importante é a lista de pokemons
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails)=> pokemonsDetails)

 
    .catch((error) => console.log(error))

}
Promise.all([// lista de requisições
    fetch('https://pokeapi.co/api/v2/pokemon/1'),
    fetch('https://pokeapi.co/api/v2/pokemon/2'),
    fetch('https://pokeapi.co/api/v2/pokemon/3'),
    fetch('https://pokeapi.co/api/v2/pokemon/4')

]).then((results) => {// resultado da lista de requisições
    console.log(results)
})




