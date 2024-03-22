class Navigation extends Components {
    template = 'components/navigation/navigation.html';
    async onInit() {

        let response = await fetch(this.template);
            if (response.ok) {
                this.innerHTML = await response.text();
            } else {
                throw new Error(`Failed to fetch HTML file: ${response.status} ${response.statusText}`);
            }
    }
    instanceBinding() {}
}

registerComponent('app-navigation', Navigation);