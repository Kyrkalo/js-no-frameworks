
class Profile extends Components {
    href = '#/profile';
    template = 'components/profile/profile.html';
    profileService;
    
    //data = Object.create(null);

    constructor (arg = inject([ProfileService])) {
        super();
        this.profileService = arg[ProfileService.name];
    }

    onInit() {
        this.data = this.profileService.Read();
        const saveProfileBound = this.saveProfile.bind(this);
        document.getElementById('submit').addEventListener('click', saveProfileBound);
    }

    saveProfile (e) {
        //this.profileService.Save(this.data);
        this.data.fname = 'fdfdfdfd';
    }
}

registerComponent('app-profile', Profile);