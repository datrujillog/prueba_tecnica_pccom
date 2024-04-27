const express = require("express");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const userService = require("../service/userServive");
const { BadRequest } = require("../middleware/error");
const errorResponse = require("../middleware/response");

class UserRouter {
    static #instance;

    constructor() {
        if (!UserRouter.#instance) {
            UserRouter.#instance = this;
            this.router = express.Router();
            this.setupRoutes();
        }

        return UserRouter.#instance;
    }

    setupRoutes() {
        this.router.post("/create", async (req, res) => {

            try {

                const body = req.body;
                const oper = req.body.oper;
                const response = await userService.createUser(body);

                res.json(response)

            } catch (error) {
                // throw new BadRequest(error.message)
                errorResponse(res, error.message);

            }

        });

        this.router.get("/get", async (req, res) => {

            try {

                const response = await userService.getAllUsers();
                res.send(response)

            } catch (error) {
                errorResponse(res, error.message);
            }
        });

        this.router.get("/getOne/:id", async (req, res) => {

            try {

                const { id } = req.params;
                const response = await userService.getUserById(id);
                if (!response.success) throw new Error(response.error.message);
                const { user } = response;
                res.json({
                    success: true,
                    user
                });

            } catch (error) {
                errorResponse(res, error.message);
            }
        });

        this.router.post("/update", async (req, res) => {
            try {

                const body = req.body;
                const userId = req.body.id;
                const oper = req.body.oper;

                if (oper == 'add') {
                    try {
                        const response = await userService.createUser(body);
                        res.send(response)
                    } catch (error) {
                        errorResponse(res, error.message);
                    }

                } else {
                    const response = await userService.updateUser(userId, body);
                    if (!response.success) throw new Error(response.error.message);
                    const { user } = response;
                    res.json({
                        success: true,
                        user
                    });
                }
            } catch (error) {
                errorResponse(res, error.message);
            }
        });

        this.router.delete("/delete/:id", async (req, res) => {
            try {

                const { id } = req.params;
                const userId = req.body.id;

                const response = await userService.deleteUser(id);
                if (!response) throw new Error(response.error.message);
                res.json({
                    success: true
                });

            } catch (error) {
                throw error
            }
        });

        //hacer paginacion
        this.router.get("/getPaginate", async (req, res) => {

            try {

                const pageNumber = parseInt(req.query.pageNumber) || 1;
                const take = parseInt(req.query.take) || 5;

                const response = await userService.getPaginatedUsers(pageNumber, take);
                res.json(response);


            } catch (error) {
                errorResponse(res, error.message);
            }
        });




        // Puedes agregar más rutas aquí si es necesario
    }

    getRouter() {
        return this.router;
    }
}

const authRouterInstance = new UserRouter();
module.exports = authRouterInstance.getRouter();