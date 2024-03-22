class App {
    
    middlewareHandlers = []

    setup = (handlers = []) => handlers.forEach(e => this.middlewareHandlers.push(e));

    run = () => this.middlewareHandlers.forEach(e => e.setup());
}

registerComponent = (name, element) => customElements.define(name, element);