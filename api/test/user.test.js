const request = require('supertest');

const userService = require('../service/userServive'); 
const userRepository = require('../repository/userRepository'); // Asegúrate de que la ruta sea correcta

jest.mock('../repository/userRepository'); // Mockea el módulo userRepository

describe('userService', () => {
    it('should create a user', async () => {
        // Datos de prueba
        const mockData = { Name: 'Diego',LastName:'Trujillo', Email: 'yego@example.com' };

        // Configura el mock para devolver un valor específico
        userRepository.createUsers.mockResolvedValue(mockData);

        // Llama a la función que estás probando
        const result = await userService.createUser(mockData);

        // Verifica que el resultado sea el esperado
        expect(result).toEqual(mockData);

        // Verifica que se haya llamado a userRepository.createUsers con los datos correctos
        expect(userRepository.createUsers).toHaveBeenCalledWith(mockData);
    });

    // si no viene  datos para crear un usuario
    it('should throw an error if no data is provided', async () => {
        // Configura el mock para devolver un valor específico
        userRepository.createUsers.mockRejectedValue(new Error('Data is required'));

        // Llama a la función que estás probando y verifica que lance un error
        await expect(userService.createUser()).rejects.toThrow('Data is required');
    });


});