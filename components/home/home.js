

class Home extends HTMLElement {
    href = '#/';
    template = 'components/home/home.html';

    connectedCallback() {
        //this.innerHTML = this.template;
    }
    disconnectedCallback() {}
}
RegisterComponent('app-home', Home);