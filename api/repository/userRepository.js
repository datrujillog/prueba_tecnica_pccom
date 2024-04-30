const { PrismaClient } = require('@prisma/client')
const { BadRequest, NotFound } = require('../middleware/error');

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

    // async getAllUsers() {

    //     try {

    //         const users = await this.#userModel.findMany();
    //         if (users.length === 0) throw new NotFound("Users not found");

    //         return users;

    //     } catch (error) {
    //         throw new BadRequest(error.message);
    //     }
    // }


    async getAllUsers(queryParams) {
        try {
            let filters = {};
            if (queryParams.filters) {
                let parsedFilters = JSON.parse(decodeURIComponent(queryParams.filters));
                parsedFilters.rules.forEach(rule => {
                    filters[rule.field] = rule.data;
                });
            }

            const users = await this.#userModel.findMany({
                where: {
                    AND: filters
                },
                skip: (parseInt(queryParams.page) - 1) * parseInt(queryParams.rows),
                take: parseInt(queryParams.rows)
            });
            if (users.length === 0) {
                return {
                    page: 1,
                    total: 1,
                    records: 0,
                    rows: []
                }
            }

            // const totalUsersCount = await this.#userModel.count();
            // const hasMore = (parseInt(queryParams.page) * parseInt(queryParams.rows)) < totalUsersCount;

            const totalUsersCount = await this.#userModel.count();
            const totalPageCount = Math.ceil(totalUsersCount / parseInt(queryParams.rows));

            const response = {
                page: queryParams.page, // número de página actual
                total: totalPageCount, // total de páginas
                records: totalUsersCount, // total de registros
                rows: users // registros para la página actual
            };
            return response;

        } catch (error) {
            throw new BadRequest(error.message);
            // return {
            //     page: 1,
            //     total: 1,
            //     records: 0,
            //     rows: []
            
            // }
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
            throw new BadRequest(error.message);
        }
    }

    async updateUser(id, data) {

        try {
            if (!id) throw new BadRequest("Id is required");

            const user = await this.#userModel.update({
                where: {
                    id: id
                },
                data
            });

            if (!user) throw new NotFound("User not found");

            return {
                success: true,
                user
            };

        } catch (error) {
            throw new BadRequest(error);
        }
    }

    async deleteUser(id) {

        try {

            const user = await this.#userModel.deleteMany({
                where: {
                    id: id
                }
            });

            if (user.count === 0) throw new NotFound("User not found");

            return user;

        } catch (error) {
            throw new BadRequest(error.message);
        }
    }

    async getPaginatedUsers(pageNumber, take) {
        try {
            const users = await this.#userModel.findMany({
                skip: (pageNumber - 1) * take, // Calcular el índice de inicio para la paginación
                take
            });
            // Verificar si hay más usuarios disponibles
            const totalUsersCount = await this.#userModel.count(); // Obtener el total de usuarios
            const hasMore = (pageNumber * take) < totalUsersCount;
            return { users, hasMore }

        } catch (error) {
            throw new BadRequest(error.message);
        }
    }




}
module.exports = new UserRepository();

// async getAllUsers(page, pageSize) {
//     try {
//         // Calcula el índice de inicio para la paginación
//         const startIndex = (page - 1) * pageSize;
//         // Obtén los usuarios para la página actual
//         const users = await this.#userModel.findMany({
//             skip: startIndex,
//             take: pageSize,
//             orderBy: { id: 'asc' }
//         });
//         // Verifica si hay más usuarios disponibles
//         const totalUsersCount = await this.#userModel.count(); // Obtén el total de usuarios
//         const hasMore = startIndex + users.length < totalUsersCount;
//         return { users, hasMore };
//     } catch (error) {
//         throw new BadRequest(error.message);
//     }
// }