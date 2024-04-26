const {PrismaClient} = require('@prisma/client')
const { BadRequest,NotFound } = require('../middleware/error');

class UserRepository {
    static #instance; // Propiedad estática para almacenar la única instancia

    #userModel;

    constructor() {
        // Verificamos si ya hay una instancia creada
        if (!UserRepository.#instance) {
            // Si no hay una instancia, creamos una nueva y la asignamos a la propiedad estática
            UserRepository.#instance = this;
            this.#userModel = new PrismaClient().user;
        }

        // Devolvemos la instancia existente
        return UserRepository.#instance;
    }

    async createUsers(data) {

        try {
    
            delete data.id;
            const user = await this.#userModel.createMany({ data });
            if (user.count == 0) throw new NotFound("User not created")

            return user;

        } catch (error) {
            if (error.code === "P2002") {
                throw new BadRequest("Email already exists");
            }
            console.log(error);
            throw new BadRequest(error.message);
        }
    }

    async getAllUsers() {

        try {

            const users = await this.#userModel.findMany();
            if (users.length === 0) throw new NotFound("Users not found");

            return users;

        } catch (error) {
            throw new BadRequest(error.message);
        }
    }

    async getUserById(id) {

        try {

            const user = await this.#userModel.findUnique({
                where: {
                    id: id
                }
            });

            if (!user) throw new Error("User not found");

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

            const user = await this.#userModel.update({
                where: {
                    id: id
                },
                data
            });

            if (!user) throw new Error("User not found");

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

            const user = await this.#userModel.deleteMany({
                where: {
                    id: id
                }
            });

            if (user.count === 0) throw new Error("User not found");

            return user;

        } catch (error) {
            throw error
        }
    }

}

module.exports = new UserRepository();

