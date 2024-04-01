class Components extends HTMLElement {

    bindingCollection = [];

    constructor() { super(); }

    connectedCallback() {
        setTimeout(() => {
            this.onInit();
            this.binding(); }, 100);
    }

    disconnectedCallback() {
        this.onDispose();
        this.bindingCollection.forEach(e => e.target.removeEventListener(e.event, e.func));
    }

    onInit () { }

    onDispose () { }

    binding() {        
        const dataBindingCollection = Array.from(document.querySelectorAll('[data-bind]'));
        if (dataBindingCollection.length > 0) {
            dataBindingCollection.forEach(e => this.htmlBinding(e, this.updateInstance.bind(this)));
    
            const array = dataBindingCollection.map(e => e.dataset.bind.split('.').slice(0, -1));
            new Set(array).forEach(e => this.updateUI(e));
            this.update(dataBindingCollection);
        }
    }

    update(e) {
        e.forEach(l => {
            let t = this;
            l.dataset.bind.split('.').forEach(key => t = t[key]);
            l.value = t;            
        });
    }

    htmlBinding(e, func) {                
        this.bindingCollection.push({ target: e, event: 'input', func: func });
        e.addEventListener('input', func);
    }

    updateUI(keys = []) {        
        let object = this;
        keys.forEach(key => {
            object[key] = new Proxy(object[key] || Object.create(null), {
                set(target, prop, value) {
                    if(target[prop] !== value) {
                        target[prop] = value;
                        document
                        .querySelectorAll(`[data-bind='${[...keys, prop].join('.')}']`)
                        .forEach(l => { l.value = value; });
                        return true;
                    }
                }
            });
            object = object[key];
        });
    }

    updateInstance(event) {
        if (event.target && event.target.dataset.bind) {
            let t = this;
            const instance = event.target.dataset.bind.split('.');
            instance.forEach((e, i) => {
                if (i == instance.length - 1) {
                    t[e] = event.target.value
                } else {
                    t = !t[e] ? t[e] = Object.create(null) : t[e];
                }
            });
        }
    }
}