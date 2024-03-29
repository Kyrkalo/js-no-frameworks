var jnf = jnf || {};
jnf.handlers = {
    RouterHandler: class {

        router = {};
    
        currentTemplate;
    
        async execute() {
    
            let url = window.location.hash.slice(1) || '/';
            let route = new this.router[url]();            
    
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
    
        setup() {
            window.addEventListener('load', this.execute.bind(this));
            window.addEventListener('hashchange', this.execute.bind(this));
        }
    
        registrate(arg = []) {
            arg.forEach(e => {
                this.router[e.path] = e.start;
            });
        }
    }
}