let TemplateEngine = require('./templateEngine');
let albumHelpers = require('./helpers/albumHelpers');

class Route {
    constructor(routes, view) {
        let self = this;
        self.element = view;
        self.routes = {
            '/': 'main'
        };
        for (let i of routes) {
            self.routes[`#${i}`] = i;
        }
    }

    handle(UsesHash) {
        let self, route;
        let hash = '';
        self = this;
        hash = UsesHash;
        if (hash.indexOf('id=') != -1) {
            hash = hash.split('&')[0];
        }
        route = self.routes[hash];
        let id = getIdParameter(UsesHash);
        if (route) {
            if (typeof self[route] === 'function') {
                if (route == 'album' && id != undefined) {
                    self[route].call(self, id);
                } else {
                    self[route].call(self);
                }
            }
        } else {
            self.error();
        }
    }

    init() {
        let self = this;
        window.addEventListener('hashchange',
            (event) => {
                self.handle.call(self, window.location.hash);
            }, false);
        window.addEventListener('beforeunload',
            (event) => {
                return "Please do not refresh the page";
            }, false);
        window.addEventListener('load',
            (event) => {
                self.handle.call(self, window.location.hash || "/");
            }, false);
        window.addEventListener('storageChange',
            (event) => {
                while (self.element.hasChildNodes()) {
                    self.element.removeChild(self.element.lastChild);
                }
                self.handle.call(self, window.location.hash || "/");
            }, false)
    }
}

class GalleryApp extends Route {
    constructor(routes, view) {
        super(routes, view);
        let self = this;
        let templateEngine = new TemplateEngine();
        for (let i of routes) {
            self[i] = ()=> {
                let tmp = null;
                if(arguments[0] != 'undefined') {
                    tmp = templateEngine.getTemplate(i, arguments[0]);
                } else {
                    tmp = templateEngine.getTemplate(i);
                }
                self.element.appendChild(tmp);
            };
        }
    }
}
module.exports = GalleryApp;