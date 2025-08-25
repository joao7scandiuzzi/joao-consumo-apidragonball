const pageInput = document.getElementById("pageInput")
const searchBtn = document.getElementById("searchBtn")
const resultsDiv = document.getElementById("results")

async function fetchCharacters(page){
    resultsDiv.innerHTML = "<p>Carregando...</p>"

    try {
        const response = await fetch(`https://dragonball-api.com/api/characters?page=${page}`)
        const data = await response.json()
        //console.log(data)

        if(data.error){
            resultsDiv.innerHTML = "<p>Página inválida!</p>"
            return
        }

        resultsDiv.innerHTML = "";
        data.items.forEach(character => {
            const card = document.createElement("div")
            card.className = "card"
            card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h3>${character.name}</h3>
            <p><strong>Status:</strong> ${character.ki}</p>
            <p><strong>Espécie:</strong> ${character.race}</p>
            `
            resultsDiv.appendChild(card)
        });

    } catch (error) {
        resultsDiv.innerHTML = "<p>Erro ao buscar personagens!</p>"
    }
}

searchBtn.addEventListener("click", () => {
 const page = pageInput.value.trim()  
 if(page){
    fetchCharacters(page)
 }else{
    resultsDiv.innerHTML = "<p>Digite um número de pagina!</p>"
 }
})

fetchCharacters(1)