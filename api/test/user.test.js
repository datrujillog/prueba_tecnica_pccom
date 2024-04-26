const request = require('supertest');

const userService = require('../service/userServive');
const userRepository = require('../repository/userRepository'); // Asegúrate de que la ruta sea correcta

jest.mock('../repository/userRepository'); // Mockea el módulo userRepository

describe('userService', () => {
    it('should create a user', async () => {
        // Datos de prueba
        const mockData = { Name: 'Diego', LastName: 'Trujillo', Email: 'yego@example.com' };

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
    // it('should throw an error if no data is provided', async () => {
    //     // Configura el mock para devolver un valor específico
    //     userRepository.createUsers.mockRejectedValue(new Error('Data is required'));

    //     // Llama a la función que estás probando y verifica que lance un error
    //     await expect(userService.createUser()).rejects.toThrow('Data is required');
    // });

    it('should get all users', async () => {
        // Datos de prueba
        const mockData = [
            { name: 'John', email: 'john@example.com' },
            { name: 'Jane', email: 'jane@example.com' }
        ];

        // Configura el mock para devolver un valor específico
        userRepository.getAllUsers.mockResolvedValue(mockData);

        // Llama a la función que estás probando
        const result = await userService.getAllUsers();

        // Verifica que el resultado sea el esperado
        expect(result).toEqual(mockData);

        // Verifica que se haya llamado a userRepository.getAllUsers
        expect(userRepository.getAllUsers).toHaveBeenCalled();
    });

    it('should handle no users', async () => {
        // Configura el mock para devolver un array vacío
        userRepository.getAllUsers.mockResolvedValue([]);

        // Llama a la función que estás probando
        const result = await userService.getAllUsers();

        // Verifica que el resultado sea un array vacío
        expect(result).toEqual([]);

        // Verifica que se haya llamado a userRepository.getAllUsers
        expect(userRepository.getAllUsers).toHaveBeenCalled();
    });

    it('should get user by id', async () => {
        // Datos de prueba
        const mockData = { id: 1, name: 'John', email: 'john@example.com' };

        // Configura el mock para devolver un valor específico
        userRepository.getUserById.mockResolvedValue(mockData);

        // Llama a la función que estás probando
        const result = await userService.getUserById(1);

        // Verifica que el resultado sea el esperado
        expect(result).toEqual({ success: true, user: mockData });

        // Verifica que se haya llamado a userRepository.getUserById con el id correcto
        expect(userRepository.getUserById).toHaveBeenCalledWith(1);
    });

    it('should handle user not found', async () => {
        // Configura el mock para devolver null
        userRepository.getUserById.mockResolvedValue(null);

        // Llama a la función que estás probando
        const result = await userService.getUserById(1);

        // Verifica que el resultado sea el esperado
        expect(result).toEqual({ ok: false, errors: [{ message: "User not found" }] });

        // Verifica que se haya llamado a userRepository.getUserById con el id correcto
        expect(userRepository.getUserById).toHaveBeenCalledWith(1);
    });

    it('should update a user', async () => {
        // Datos de prueba
        const mockData = { name: 'John', email: 'john@example.com' };
        const updatedData = { name: 'John Doe', email: 'john@example.com' };

        // Configura el mock para devolver un valor específico
        userRepository.updateUser.mockResolvedValue(updatedData);

        // Llama a la función que estás probando
        const result = await userService.updateUser(1, mockData);

        // Verifica que el resultado sea el esperado
        expect(result).toEqual({ success: true, user: updatedData });

        // Verifica que se haya llamado a userRepository.updateUser con los datos correctos
        expect(userRepository.updateUser).toHaveBeenCalledWith(1, mockData);
    });

    it('should handle update failure', async () => {
        // Configura el mock para devolver null
        userRepository.updateUser.mockResolvedValue(null);

        // Datos de prueba
        const mockData = { name: 'John', email: 'john@example.com' };

        // Llama a la función que estás probando
        const result = await userService.updateUser(1, mockData);

        // Verifica que el resultado sea el esperado
        expect(result).toEqual({ ok: false, errors: [{ message: "Update failed" }] });

        // Verifica que se haya llamado a userRepository.updateUser con los datos correctos
        expect(userRepository.updateUser).toHaveBeenCalledWith(1, mockData);
    });


    it('should delete a user', async () => {
        // Configura el mock para devolver true
        userRepository.deleteUser.mockResolvedValue(true);

        // Llama a la función que estás probando
        const result = await userService.deleteUser(1);

        // Verifica que el resultado sea el esperado
        expect(result).toBe(true);

        // Verifica que se haya llamado a userRepository.deleteUser con el id correcto
        expect(userRepository.deleteUser).toHaveBeenCalledWith(1);
    });

    it('should handle delete failure', async () => {
        // Configura el mock para devolver false
        userRepository.deleteUser.mockResolvedValue(false);

        // Llama a la función que estás probando
        const result = await userService.deleteUser(1);

        // Verifica que el resultado sea el esperado
        expect(result).toBe(false);

        // Verifica que se haya llamado a userRepository.deleteUser con el id correcto
        expect(userRepository.deleteUser).toHaveBeenCalledWith(1);
    });


});