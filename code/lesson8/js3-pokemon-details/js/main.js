(function() {
    const pokemonList = document.querySelector("#pokemonList");
    const detailsLoading = document.querySelector("#detailsLoading");
    const detailsContent = document.querySelector("#detailsContent");
    const pokemonImage = document.querySelector("#pokemonImage");
    
    const limit = 20;
    
    const originalUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}`;
    let pokemonDataList;

    async function loadData(url) {
        pokemonDataList = await fetchData(url);
        fillList(pokemonDataList);
    }
    loadData(originalUrl);

    pokemonList.addEventListener("click", async function(event) {
        event.preventDefault();
        if (event.target.tagName !== "A") {
            return;
        }

        detailsLoading.style.display = "block";
        detailsContent.style.display = "none";
        pokemonImage.src = "loadingImageFile.png";

        const pokeUrl = event.target.dataset.pokemonUrl;
        const pokeDetails = await fetchData(pokeUrl);

        fillDetails(pokeDetails);

        detailsLoading.style.display = "none";
        detailsContent.style.display = "block";
    });

})();

function fillDetails(pokemonData) {
    const pokemonName = document.querySelector("#pokemonName");
    const pokemonExtraInfo = document.querySelector("#pokemonExtraInfo");
    const pokemonImage = document.querySelector("#pokemonImage");

    console.log(pokemonData);

    pokemonName.innerHTML = pokemonData.name;
    pokemonExtraInfo.innerHTML = `
        Base Experience: ${pokemonData.base_experience}<br>
        Height: ${pokemonData.height}<br>
    `;
    pokemonImage.src = pokemonData.sprites.other["official-artwork"].front_default;
}


function fillList(pokemonDataList) {
    const pokemonList = document.querySelector("#pokemonList");

    let newContent = "";
    pokemonDataList.results.forEach(function(pokemon) {
        newContent += "<li>";
        newContent += `<a href="#" data-pokemon-url="${pokemon.url}">`;
        newContent += pokemon.name;
        newContent += "</a>";
        newContent += "</li>";
    });
    pokemonList.innerHTML = newContent;
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const result = await response.json();

        // console.log(result);
        return result;
    } catch(error) {
        alert("didn't work... please refresh the page...");
    }
}