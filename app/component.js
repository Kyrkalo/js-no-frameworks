class Components extends HTMLElement {

    bindings = [];

    constructor() { super(); }

    connectedCallback() {
        setTimeout(() => {
            this.onInit();
            this.binding(); }, 100);
    }

    disconnectedCallback() {
        this.onDispose();
        this.unbinding();
    }

    onInit () { }

    onDispose () { }

    binding() {
        const updateInstanceBind = this.updateInstance.bind(this);
        document.querySelectorAll('[data-bind]').forEach(e => {
            this.htmlBinding(e, updateInstanceBind);
            this.instanceBinding(e);
        });
    }

    htmlBinding(e, func) {                
        this.bindings.push({ target: e, event: 'input', func: func });
        e.addEventListener('input', func);
    }

    collection = [];

    instanceBinding(event) {
        if (event.dataset && event.dataset.bind) {
            let t = this;
            const keys = event.dataset.bind.split('.');
            let append = [];
            keys.forEach((key,index)=> {
                if (index < keys.length - 1) {
                    if (!t[key]) {
                        t[key] = Object.create(null);
                    }
                    append.push(key);
                }
                if (index !== keys.length - 1 && !this.collection.some(l => l == key)) {
                    this.collection.push(key);
                    t[key] = new Proxy(t[key], {
                        set(target, prop, value) {
                            target[prop] = value;
                            document.querySelectorAll(`[data-bind='${[...append, prop].join('.')}']`)
                            .forEach(l => { l.value = value; });
                            return true;
                        }
                    });
                }
            });
        }
    }

    unbinding = () => this.bindings.forEach(e => e.target.removeEventListener(e.event, e.func));

    updateInstance(event) {
        if (event.target && event.target.dataset.bind) {
            let t = this;
            const instance = event.target.dataset.bind.split('.');
            instance.forEach((e, i) => {
                if (i == instance.length - 1) {
                    t[e] = event.target.value
                } else {
                    t = !t[e] ? t[e] = {} : t[e];
                }
            });
        }
    }
}