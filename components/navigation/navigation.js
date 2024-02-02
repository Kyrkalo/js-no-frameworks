class Navigation extends HTMLElement {
    template = 'components/navigation/navigation.html';
    async connectedCallback() {

        let response = await fetch(this.template);
            if (response.ok) {
                this.innerHTML = await response.text();
            } else {
                throw new Error(`Failed to fetch HTML file: ${response.status} ${response.statusText}`);
            }
    }
    disconnectedCallback() {}
}

Component('app-navigation', Navigation);