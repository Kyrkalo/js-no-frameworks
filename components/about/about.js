class About extends HTMLElement {
    
    template = 'components/about/about.html';
    href = '#/about';

    connectedCallback() {
        //this.innerHTML = this.template;
    }
    disconnectedCallback() {}
}

Component('app-about', About);