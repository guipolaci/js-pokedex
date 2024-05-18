const pokemonNome = document.querySelector('.pokemon_nome')
const pokemonNum = document.querySelector('.pokemon_num')
const pokemonImg = document.querySelector('.pokemon_img')
const pokemonTipo = document.querySelector('.pokemon_tipo')
const pokemonHp = document.querySelector('.pokemon_hp')
const pokemonAtaque = document.querySelector('.pokemon_ataque')
const pokemonDefesa = document.querySelector('.pokemon_defesa')
const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const buttonAnte = document.querySelector('.btn-anterior')
const buttonProx = document.querySelector('.btn-proximo')
let search_pokemon = 1


const  fetchPokemon = async (pokemon) => {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIresponse.status === 200){
        const data = await APIresponse.json()
        return data
    }

   
}

const renderPokemon = async (pokemon) => {

    pokemonNome.innerHTML = 'Carregando...'
    pokemonNum.innerHTML = ''

    const data = await fetchPokemon(pokemon)

    if (data){
        pokemonImg.style.display = 'block'
        pokemonNome.innerHTML = data.name
        pokemonNum.innerHTML = data.id
        pokemonTipo.innerHTML = "Tipo: " + data['types']['0']['type']['name']
        pokemonHp.innerHTML = "Hp: " + data['stats']['0']['base_stat']
        pokemonAtaque.innerHTML = "Ataque: " + data['stats']['1']['base_stat']
        pokemonDefesa.innerHTML = "Defesa: " + data['stats']['2']['base_stat']
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        search_pokemon = data.id
    }

    else {
        pokemonImg.style.display = 'none'
        pokemonNome.innerHTML = 'Não encontrado :c'
        pokemonNum.innerHTML = ''
    }

   
}

form.addEventListener('submit', (event) => {
    event.preventDefault()

    renderPokemon(input.value.toLowerCase())
    

})

buttonAnte.addEventListener('click', () => {
    if(search_pokemon > 1){
        search_pokemon -= 1
        renderPokemon(search_pokemon)
    }
    
})

buttonProx.addEventListener('click', () => {
    search_pokemon += 1
    renderPokemon(search_pokemon)
})

renderPokemon(search_pokemon)




