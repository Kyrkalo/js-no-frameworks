
class ProfileService {

    constructor() { }

    Save = (data)  => localStorage.setItem('profile', JSON.stringify(data));

    async SaveAsync() { }

    Read = () => JSON.parse(localStorage.getItem('profile') ?? { fname: '', lname: '', birth: '' });

    async ReadAsync() { }
}

register(ProfileService)