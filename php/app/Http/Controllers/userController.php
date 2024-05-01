<?php

namespace App\Http\Controllers;

use App\Models\usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator; // Importar la clase Validator
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    // public function list()
    // {
    //     $usuario = usuario::all();
    //     return $usuario;
    //     // phpinfo();
    // }





    public function list(Request $request)
    {
        $page = $request->input('page', 1); 
        $rows = $request->input('rows', 15); 

        $skip = ($page - 1) * $rows; 

        $usuarios = Usuario::skip($skip)->take($rows)->get(); 
        $totalUsuarios = Usuario::count(); 

        $totalPaginas = ceil($totalUsuarios / $rows);  // Calcular el total de páginas

        $response = [
            'page' => $page,
            'total' => $totalPaginas,
            'records' => $totalUsuarios,
            'rows' => $usuarios
        ];

        return response()->json($response);
    }




    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'Name' => 'required',
            'LastName' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'phone' => 'required',
            'address' => 'required',
            'city' => 'required',
            'oper' => 'required'
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $usuario = usuario::create($request->all());

        return
            [
                'status' => 'success',
                'message' => 'Usuario creado correctamente',
                'data' => $usuario
            ];
    }


    public function datos(Request $request)
    {

        if ($request->oper == 'edit') {
            $usuario = usuario::find($request->id);

            if ($usuario == null) {
                return [
                    'status' => 'error',
                    'message' => 'Usuario no encontrado'
                ];
            }

            $validator = Validator::make($request->all(), [   // Validar los datos recibidos
                'Name' => 'required',
                'LastName' => 'required',
                'email' => 'required|email',
                'password' => 'required',
                'phone' => 'required',
                'address' => 'required',
                'city' => 'required',
                'oper' => 'required'
            ]);

            if ($validator->fails()) {    // Si hay errores en la validación de los datos
                throw new ValidationException($validator);
            }

            $usuario->Name = $request->Name;
            $usuario->LastName = $request->LastName;
            $usuario->email = $request->email;
            $usuario->password = $request->password;
            $usuario->phone = $request->phone;
            $usuario->address = $request->address;
            $usuario->city = $request->city;
            $usuario->oper = $request->oper;

            // $usuario->save();
            $usuario->update();  // Actualizar los datos del usuario

            return [
                'status' => 'success',
                'message' => 'Usuario actualizado correctamente',
                'data' => $usuario  // Devolver los datos del usuario actualizado
            ];
        } else if ($request->oper == 'add') {
            $usuario = $this->create($request);
        } else if ($request->oper == 'del') {
            $usuario = $this->delete($request->id);
        } else {
            return [
                'status' => 'error',
                'message' => 'Operación no válida'
            ];
        }
    }

    public function delete($id)
    {
        $usuario = usuario::find($id);

        if ($usuario == null) {
            return [
                'status' => 'error',
                'message' => 'Usuario no encontrado'
            ];
        }

        $usuario->delete();

        return [
            'status' => 'success',
            'message' => 'Usuario eliminado correctamente'
        ];
    }
}
