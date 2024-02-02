class App {
    routes = {};
    templates = {};
    currentTemplate;

    #route (path, template) {
        // if (typeof template === 'function') {
        //     return this.routes[path] = template;
        // }
        if (typeof template === 'string') {
            return this.routes[path] = this.templates[template];
        }
        return undefined;        
    }

    resolveRoute(route) {
        try {
            return this.routes[route];
        } catch (e) {
            throw new Error(`Route ${route} not found`);
        }
    }

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

    #template = (name, func) => this.templates[name] = func;

    registrate(path, name, f) {
        this.#template(name, f);
        this.#route(path, name);
    }

    ready() {
        window.addEventListener('load', this.router.bind(this));
        window.addEventListener('hashchange', this.router.bind(this));
    }
}

Component = (name, element) => customElements.define(name, element);