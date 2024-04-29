const { parseDatos, parseDatosUpdate } = require("../helpers/normalizeData");
const { BadRequest } = require("../middleware/error");
const userRepository = require("../repository/userRepository");

class UserService {
    static #instance;

    constructor() {
        if (!UserService.#instance) {

            UserService.#instance = this;
        }

        return UserService.#instance;
    }

    async createUser(data) {

        const parseBody = await parseDatos(data);
        const user = await userRepository.createUsers(parseBody);
        return user;
    }

    async getAllUsers(queryParams) {

        const users = await userRepository.getAllUsers(queryParams);
        return users
    }

    // async getAllUsers(page, pageSize) {
    //     try {
    //         const { users, hasMore } = await userRepository.getAllUsers(page, pageSize);
    //         return { users, hasMore };
    //     } catch (error) {
    //         throw new Error(`Error fetching users: ${error.message}`);
    //     }
    // }
    


    async getUserById(id) {
        const user = await userRepository.getUserById(id);
        if (!user) {
            return {
                ok: false,
                errors: [{ message: "User not found" }]
            };
        }
        return {
            success: true,
            user
        };
    }

    async updateUser(id, userData) {
        const updatedUser = await userRepository.updateUser(id, userData);
        if (!updatedUser) {
            return {
                ok: false,
                errors: [{ message: "Update failed" }]
            };
        }
        return {
            success: true,
            user: updatedUser
        };
    }

    async deleteUser(id) {

        try {

            const user = await userRepository.deleteUser(id);

            return user;

        } catch (error) {
            throw error
        }
    }

    async getPaginatedUsers(pageNumber, take) {
            const response = await userRepository.getPaginatedUsers(pageNumber, take);
            return response;        
    }


}

module.exports = new UserService();