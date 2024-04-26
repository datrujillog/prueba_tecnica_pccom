const { BadRequest, NotFound } = require("../middleware/error");



const parseDatos = async (body) => {
    const requiredFields = ['Name', 'LastName', 'Email'];

    try {
        for (const field of requiredFields) {
            if (!(field in body)) {
                throw new NotFound(`Falta el campo obligatorio: ${field}`);
            }
        }

        const dataNormalized = {
            Name: body.Name,
            LastName: body.LastName,
            Email: body.Email,
        };

        return dataNormalized;

    } catch (error) {
        throw new BadRequest(error);
    }

}

module.exports = parseDatos;