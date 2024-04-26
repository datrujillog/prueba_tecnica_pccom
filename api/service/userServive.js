const parseDatos = require("../helpers/normalizeData");
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

    async getAllUsers() {

        try {

            const users = await userRepository.getAllUsers();

            return users

        } catch (error) {
            return {
                success: false,
                error
            };
        }
    }

    async getUserById(id) {

        try {

            const user = await userRepository.getUserById(id);

            return {
                success: true,
                user
            };

        } catch (error) {
            return {
                success: false,
                error
            };
        }
    }

    async updateUser(id, data) {

        try {
            delete data.id;
            const user = await userRepository.updateUser(id, data);

            return {
                success: true,
                user
            };

        } catch (error) {
            return {
                success: false,
                error
            };
        }
    }

    async deleteUser(id) {

        try {

            const user = await userRepository.deleteUser(id);

            return user;

        } catch (error) {
            throw error
        }
    }

}

module.exports = new UserService();