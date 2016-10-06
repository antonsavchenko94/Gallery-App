function createAlbum() {
    let input = document.querySelector("#albumName");
    if (input.value.trim()) {
        let newAlbum = {
            title: input.value,
            photos: []
        };
        localStorage.setItem(makeId(), JSON.stringify(newAlbum));
        window.dispatchEvent(storageChange);
        alert(`Album "${newAlbum.title}"`);
    } else {
        alert("Insert album name");
    }
}

function deleteAlbum(event) {
    let name = event.path[0].name;
    localStorage.removeItem(name);
    alert(`Album with id = ${name}`);
    window.dispatchEvent(storageChange);
}

function appendTableView(element) {
    if (localStorage.length != 0) {
        let tBody = element.querySelector('#tcontent');
        for (let key in localStorage) {

            let tr = document.createElement('tr');
            let name = document.createElement('td');
            let a = document.createElement('a');
            let action = document.createElement('td');
            let deleteButton = deleteAlbumButton(key);
            let album = JSON.parse(localStorage.getItem(key));

            a.href = "#album&id=" + key;
            a.innerHTML = album.title + `(${album.photos.length})`;

            name.appendChild(a);
            action.appendChild(deleteButton);
            tr.appendChild(name);
            tr.appendChild(action);
            tBody.appendChild(tr);
        }
    }
}

function deleteAlbumButton(key) {
    let link = document.querySelectorAll('link[rel="import"]');
    let albumImport = link[0].import;
    let button = albumImport.querySelector('.universal-button').cloneNode(true);
    button.name = key;
    button.addEventListener('click', deleteAlbum);

    return button;

}

let makeId = () => {
    var text = "";
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 8; i++)
        text += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    return text;
};


module.exports = {
    createAlbum: createAlbum,
    deleteAlbum: deleteAlbum,
    appendTableView: appendTableView,
    makeId: makeId
};