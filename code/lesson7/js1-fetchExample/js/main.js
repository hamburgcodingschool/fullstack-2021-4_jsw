// closure will run as soon as the page loads
(function () {
    
    // const loadListButton = document.querySelector("#loadListButton");
    const listContent = document.querySelector("#listContent");
    const detailContent = document.querySelector("#detailContent");

    let result;

    // loadListButton.addEventListener("click", async function() {
    //     const url = "https://jsonplaceholder.typicode.com/users";
    //     result = await fetchData(url);
    //     listContent.innerHTML = createList(result);
    // });

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
