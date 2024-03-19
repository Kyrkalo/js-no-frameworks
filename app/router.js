
class router extends HTMLElement {
    
    connectedCallback = () => this.innerHTML = `<div class='router'></div>`;
}

RegisterComponent('app-router', router);