// closure will run as soon as the page loads
(function () {
    
    const listContent = document.querySelector("#listContent");
    const detailContent = document.querySelector("#detailContent");
    const selectSort = document.querySelector("#selectSort");

    let result;

    // async closure so we can take advantage of the await syntax
    (async function() {
        const url = "https://jsonplaceholder.typicode.com/users";
        result = await fetchData(url);
        listContent.innerHTML = createList(result);
    })();

    listContent.addEventListener("click", function(event) {
        if (event.target.tagName !== "BUTTON") {
            return;
        }

        const index = event.target.dataset.index;
        detailContent.innerHTML = createDetails(result[index]);
    });

    selectSort.addEventListener("change", function(event) {
        if (selectSort.value === "nameAsc") {
            result = sortByNameASC(result);

        } else if (selectSort.value === "nameDesc") {
            result = sortByNameDESC(result);

        } else if (selectSort.value === "userAsc") {
            result = sortByUserASC(result);
            
        } else if (selectSort.value === "userDesc") {
            result = sortByUserDESC(result);
        }            
        
        listContent.innerHTML = createList(result);
    });
    
})();

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const result = await response.json();

        return result;
    } catch (error) {
        console.log(error);
    }
}

function createList(data) {
    let list = "<table><tr><th>Name</th><th>Username</th><th></th></tr>";
    for (let i = 0; i < data.length; i++) {
        list += "<tr>";
        list += `<td>${data[i].name}</td>`;
        list += `<td>${data[i].username}</td>`;
        list += `<td><button data-index="${i}">details</button></td>`;
        list += "</tr>";
    }
    list += "</table>";

    return list;
}

function createDetails(data) {
    let html = `
    <h3>${data.name}</h3>
    <ul>
    <li>${data.address.street}</li>
    <li>${data.address.suite}</li>
    <li>${data.address.city}</li>
    </ul>`;

    return html;
}

function sortByNameASC(dataArray) {
    const copyOfDataArray = [...dataArray];
    copyOfDataArray.sort(function(a, b) {
        // this could be done better with localeCompare
        // here to examplify only
        if (a.name < b.name) {
            return -1;
        } else if (a.name > b.name) {
            return 1;
        } else {
            return 0;
        }
    });
    return copyOfDataArray;
}

function sortByNameDESC(dataArray) {
    const copyOfDataArray = [...dataArray];
    copyOfDataArray.sort(function(a, b) {
        return b.name.localeCompare(a.name);
    });
    return copyOfDataArray;
}

function sortByUserASC(dataArray) {
    const copyOfDataArray = [...dataArray];
    copyOfDataArray.sort(function(a, b) {
        return a.username.localeCompare(b.username);
    });
    return copyOfDataArray;
}

function sortByUserDESC(dataArray) {
    const copyOfDataArray = [...dataArray];
    copyOfDataArray.sort(function(a, b) {
        return b.username.localeCompare(a.username);
    });
    return copyOfDataArray;
}