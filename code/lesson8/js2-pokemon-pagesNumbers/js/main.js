(function() {
    const limit = 200;

    const buttonPrev = document.querySelector("#buttonPrev");
    const buttonNext = document.querySelector("#buttonNext");
    const pageButtonHolder = document.querySelector("#pageButtonHolder");

    const originalUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}`;
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

        const numberOfPages = Math.ceil(pokemonDataList.count / limit);
        createPageButtons(numberOfPages);
    }
    
    loadData(originalUrl);

    buttonPrev.addEventListener("click", function() {
        loadData(pokemonDataList.previous);
    })

    buttonNext.addEventListener("click", function() {
        loadData(pokemonDataList.next);
    })

    pageButtonHolder.addEventListener("click", function(event) {
        if (event.target.tagName !== "BUTTON") {
            return;
        }
        const pageNumber = event.target.innerHTML;
        const offset = (pageNumber - 1) * limit;
        const newUrl = originalUrl + "&offset=" + offset;

        console.log(newUrl);

        loadData(newUrl);
    });
})();

function createPageButtons(number) {

    let newContent = "";
    for(let i = 1; i <= number; i++) {
        newContent += `<button>${i}</button>`;
        // newContent += "<button>";
        // newContent += i;
        // newContent += "</button>";
    }
    pageButtonHolder.innerHTML = newContent;
}

function fillList(pokemonDataList) {
    const pokemonList = document.querySelector("#pokemonList");

    let newContent = "";
    pokemonDataList.results.forEach(function(pokemon) {
        newContent += `<li>${pokemon.name}</li>`;
        // newContent += "<li>";
        // newContent += pokemon.name;
        // newContent += "</li>";
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