class Components extends HTMLElement {

    constructor() {
        super();
        this.binding();
    }

    connectedCallback() {
        this.onInit();
        this.afterInit();
        this.update();
    }

    disconnectedCallback() {
        this.dispose();
    }

    onInit() { }

    afterInit() { }

    dispose() { }

    update() {
        const elementsWithDataBind = document.querySelectorAll('[data-bind]');
        elementsWithDataBind.forEach(e => {
            const instance = e.dataset.bind.split('.');
            if (instance) {
                let t = this;
                for(let item of instance) {
                    t = t[item];
                }
                e.value = t;
            }
        });
    }

    binding() {
        setTimeout(() => {
            const elementsWithDataBind = document.querySelectorAll('[data-bind]');
            const bindFunction = this.updateEvent.bind(this);
            elementsWithDataBind.forEach(e => e.addEventListener('input', bindFunction));
        }, 100);
    }

    updateEvent(event) {
        let t = this;
        if (event.target.dataset.bind) {
            const instance = event.target.dataset.bind.split('.');
            instance.forEach((e, i) => i == instance.length - 1 ? t[e] = event.target.value : t = t[e]);
        }
    }
}
