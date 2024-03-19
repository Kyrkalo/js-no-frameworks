const injection_registry = {};

function register(T) {
    injection_registry[T.name] = T;
}

function inject(T) {
    const obj = {};
    
    if (Array.isArray(T)) {
        T.forEach(e => {
            obj[e.name] = new injection_registry[e.name]();
        });
    } else {
        obj[e.name] = new injection_registry[T]();
    }

    return obj;
}