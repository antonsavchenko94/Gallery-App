let albumHelpers = require('./helpers/albumHelpers');
let photoHelpers = require('./helpers/photoHelpers');

class TemplateEngine {
    constructor() {
    }

    getTemplate(tmpName) {
        if (arguments.length > 1) {
            return this[`${tmpName}Template`].call(this,arguments[1]);
        }else {
            return this[`${tmpName}Template`].call(this);
        }
    }

    mainTemplate() {
        if(document.querySelector('#photos')){
            document.querySelector('#photos').remove();
        }
        document.querySelector('#home').innerHTML = 'Home';
        let link = document.querySelectorAll('link[rel="import"]');
        let albumImport = link[0].import;
        let newAlbum = albumImport.querySelector('#new-album').cloneNode(true);

        newAlbum.querySelector('#create-album').addEventListener('click' ,albumHelpers.createAlbum);
        let albumsView = albumImport.querySelector('#albums-view').cloneNode(true);
        albumHelpers.appendTableView(albumsView);

        let wrapper = document.createElement('div');
        wrapper.id = 'albums';
        wrapper.appendChild(newAlbum);
        wrapper.appendChild(albumsView);
        return wrapper;
    }
    albumTemplate() {
        if(document.querySelector('#albums')){
            document.querySelector('#albums').remove();
        }
        document.querySelector('#home').innerHTML = 'Go to home page';
        let link = document.querySelectorAll('link[rel="import"]');
        let photosImport = link[1].import;
        let uploadPhoto = photosImport.querySelector('#upload-photo').cloneNode(true);

        let imageBlock = photosImport.querySelector('#image-block').cloneNode(true);
        let imageBloks = photoHelpers.viewPhoto(imageBlock);

        uploadPhoto.querySelector('.universal-button').addEventListener('click', photoHelpers.readPhoto);
        uploadPhoto.querySelector('#webcam').addEventListener('click', photoHelpers.showVideo);

        let wrapper = document.createElement('div');
        wrapper.id = 'photos';
        wrapper.appendChild(uploadPhoto);
        wrapper.appendChild(imageBloks);
        return wrapper;
    }
}

module.exports = TemplateEngine;