let GalleryApp = require('./routing');

window.getIdParameter = (hash) => {
    return hash.substr(hash.indexOf('id='))
        .split('&')[0]
        .split('=')[1];
};

(function () {
    document.onreadystatechange = (event) => {
        if(typeof storageChange === 'undefined'){
            window.storageChange = new Event('storageChange');
        }
        let routes = ['main', 'album'];
        let mainView = document.getElementById('view');
        let app = new GalleryApp(routes, mainView);
        if (document.readyState === 'complete') {
            app.init();
        }
    };
})();