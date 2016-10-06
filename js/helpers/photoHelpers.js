function savePhoto(base64, name) {
    let albumId = getIdParameter(window.location.hash);
    let album = JSON.parse(localStorage.getItem(albumId));
    let photo = {
        phBase64: base64,
        name: name || new Date().toString()
    };
    album.photos.push(photo);
    localStorage.setItem(albumId, JSON.stringify(album));
    window.dispatchEvent(storageChange);
}

function readPhoto() {
    let file = document.querySelector('#file-input').files[0];
    let reader = new FileReader;

    reader.onloadend = function () {
        savePhoto(reader.result, file.name);
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        alert("Choose photo!!!");
    }
}

function makePhoto() {
    let canvas = document.querySelector('canvas');
    let video = document.querySelector('video');
    canvas.getContext('2d').drawImage(video, 0, 0, 320, 320);
    savePhoto(canvas.toDataURL());
}

function showVideo() {
    let link = document.querySelectorAll('link[rel="import"]');
    let photosImport = link[1].import;
    let webCam = photosImport.querySelector('#webcam-block').cloneNode(true);
    let video = webCam.querySelector('video');
    webCam.querySelector('#snap')
        .addEventListener('click', makePhoto);
    document.querySelector('#photos')
        .insertBefore(webCam, document.querySelector('#photos').firstChild);

    navigator.getUserMedia = navigator.webkitGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true}, successCallback, (err)=> {
            console.log(err);
        });
    }

    function successCallback(stream) {
        if (video.mozSrcObject !== undefined) {
            video.mozSrcObject = stream;
        } else {
            video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
        }
        video.play();
    }

}

function viewPhoto(element) {
    let img = element.querySelector('.img');
    let albumId = getIdParameter(window.location.hash);
    let photos = JSON.parse(localStorage.getItem(albumId)).photos;
    if (photos.length != 0) {
        for (let item of photos) {
            let newImg = img.cloneNode(true);
            newImg.querySelector('.photo').src = item.phBase64;
            newImg.querySelector('.ph-name').innerHTML = item.name;
            newImg.querySelector('.universal-button').name = item.name;
            newImg.querySelector('.universal-button').addEventListener('click', deletePhoto);
            element.appendChild(newImg);
        }
    }
    img.remove();
    return element;
}

function deletePhoto() {
    let albumId = getIdParameter(window.location.hash);
    let album = JSON.parse(localStorage.getItem(albumId));
    album.photos = album.photos.filter((obj)=> {
        return obj.name !== event.path[0].name;
    });
    localStorage.setItem(albumId, JSON.stringify(album));
    window.dispatchEvent(storageChange);
}

module.exports = {
    readPhoto: readPhoto,
    viewPhoto: viewPhoto,
    showVideo: showVideo
};