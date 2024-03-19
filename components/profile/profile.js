
class Profile extends Components {
    href = '#/profile';
    template = 'components/profile/profile.html';

    profileService;
    
    data = { }

    constructor (arg = inject([ProfileService])) {
        super();
        this.profileService = arg[ProfileService.name];
    }

    onInit() {
        this.data = this.profileService.Read();
        document.getElementById('fname').value = this.data?.fname;
        document.getElementById('lname').value = this.data?.lname;
        document.getElementById('birth').value = this.data?.birth;

        const saveProfileBound = this.saveProfile.bind(this);
        document.getElementById('submit').addEventListener('click', saveProfileBound);
    }

    saveProfile (e) {
        this.profileService.Save(this.data);
    }
}

RegisterComponent('app-profile', Profile);