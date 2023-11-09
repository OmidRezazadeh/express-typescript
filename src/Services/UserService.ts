import { User } from '../Models/User';

class UserService {
    async create(data: any) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log(error)
        }
    }
}

export const userService = new UserService()