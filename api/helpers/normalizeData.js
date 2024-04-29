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
            Password: body.Password,
            Phone: body.Phone,
            Address: body.Address,
            City: body.City
        };

        return dataNormalized;

    } catch (error) {
        throw new BadRequest(error);
    }

}


const parseDatosUpdate = async (body) => {
    const requiredFields = ['id'];

    try {
        for (const field of requiredFields) {
            if (!(field in body)) {
                throw new NotFound(`Falta el campo obligatorio: ${field}`);
            }
        }

        const dataNormalized = {
            id: body.id,
        };

        return dataNormalized;

    } catch (error) {
        throw new BadRequest(error);
    }

}

module.exports = {
    parseDatos,
    parseDatosUpdate
}