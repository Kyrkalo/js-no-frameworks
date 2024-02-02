
class router extends HTMLElement {
    
    connectedCallback = () => this.innerHTML = `<div class='router'></div>`;
}

Component('app-router', router);