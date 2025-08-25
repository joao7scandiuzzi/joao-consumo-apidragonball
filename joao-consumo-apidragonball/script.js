const pageInput = document.getElementById("pageInput")
const searchBtnt = document.getElementById("searchBtn")
const resultsDiv = document.getElementById("results")

async function fetchCharacters(page) {
    resultsDiv.innerHTML = "<p>Carregando..</p>"


    try {
        const response = await fetch(`hhttps://www.dragonball-api.com/api?page=${page}`)
        const data = await response.json()
        console.log(data)

        if (data.erro) {
            resultsDiv.innerHTML = "<p>Página inválida!</p>"
            return

        }

        resultsDiv.innerHTML = "";
        data.results.forEach(Character => {
            const card = document.createElement("div")
            card.className = "card"
            card.innerHTML = `
            <img src="${Character.image}" alt="${Character.name}">
            <h3>${Character.name}</h3>
            <p><strong>Status:</strong> ${Character.status}
            <p><strong>Espécie:</strong> ${Character.species}

`
            resultsDiv.appendChild(card)
        });

    } catch (error) {

        resultsDiv.innerHTML = "<p>Erro ao buscar personagens!</p>"

    }
}

searchBtnt.addEventListener("click", () => {
    const page = pageInput.value.trim()
    if (page) {
        fetchCharacters(page)
    } else {
        resultsDiv.innerHTML = "<p>Digite um número de página!</p>"
    }
})
fetchCharacters(1)