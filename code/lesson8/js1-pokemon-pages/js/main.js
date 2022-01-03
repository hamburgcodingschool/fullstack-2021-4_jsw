(function() {
    const buttonPrev = document.querySelector("#buttonPrev");
    const buttonNext = document.querySelector("#buttonNext");

    const originalUrl = "https://pokeapi.co/api/v2/pokemon/?limit=20";
    let pokemonDataList;

    async function loadData(url) {
        buttonPrev.disabled = true;
        buttonNext.disabled = true;

        pokemonDataList = await fetchData(url);
        fillList(pokemonDataList);

        if (pokemonDataList.next) {
            buttonNext.disabled = false;
        }

        if (pokemonDataList.previous) {
            buttonPrev.disabled = false;
        }
    }
    
    loadData(originalUrl);

    buttonPrev.addEventListener("click", function() {
        loadData(pokemonDataList.previous);
    })

    buttonNext.addEventListener("click", function() {
        loadData(pokemonDataList.next);
    })

})();

function fillList(pokemonDataList) {
    const pokemonList = document.querySelector("#pokemonList");

    let newContent = "";
    pokemonDataList.results.forEach(function(pokemon) {
        newContent += "<li>";
        newContent += pokemon.name;
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