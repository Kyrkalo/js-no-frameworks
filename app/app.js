class App {
    routes = {};
    templates = {};
    currentTemplate;

    async router(evt) {
        let url = window.location.hash.slice(1) || '/';

        let route = this.resolveRoute(url);

        if (route && this.currentTemplate != route) {
            let approuter = document.body.getElementsByTagName('app-router')[0];
            if (this.currentTemplate) {
                approuter.removeChild(this.currentTemplate);
            }

            let response = await fetch(route.template);
            if (response.ok) {
                route.innerHTML = await response.text();
                approuter.appendChild(route);
                this.currentTemplate = route;
            } else {
                throw new Error(`Template is not defined: ${response.status} ${response.statusText}`);
            }
        }
    }

    resolveRoute = (route) => this.routes[route];

    registrate(path, name, f) {
        this.templates[name] = f;
        this.routes[path] = f;
    }

    ready() {
        window.addEventListener('load', this.router.bind(this));
        window.addEventListener('hashchange', this.router.bind(this));
    }
}

RegisterComponent = (name, element) => customElements.define(name, element);