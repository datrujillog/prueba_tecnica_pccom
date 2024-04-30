

const swaggerAPi = {
  "openapi": "3.1.0",
  "info": {
    "title": "API REST",
    "description": "Prueba tecnica para la empresa PCCOM",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "http://localhost:5000",
      "description": "Local server"
    },
    { 
      "url": "http://3.88.143.154:5000",
      "description": "Server AWS"
    }
      
    
  ],




  "tags": [
    {
      "name": "User",
      "description": "Endpoints de User"
    }
  ],

  "paths": {

    "/api/user/create": {
      "post": {
        "summary": "user create",
        "tags": ["User"],
        "description": "user create",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/user create"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "User created successfully"
          },
          "400": {
            "description": "Error in the shipping data"
          },
          "500": {
            "description": "Error in the server"
          }
        }
      }
    },

    "/api/user/get": {
      "get": {
        "summary": "user list",
        "tags": ["User"],
        "description": "user list",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Page number",
            "required": false,
            "type": "integer",
            "example": "1"
          },
          {
            "name": "rows",
            "in": "query",
            "description": "Number of rows per page",
            "required": false,
            "type": "integer",
            "example": "5"
          }
        ],
        "responses": {
          "200": {
            "description": "User get successfully"
          },
          "400": {
            "description": "Error in the shipping data"
          },
          "500": {
            "description": "Error in the server"
          }
        }
      }
    },


    "/api/user/update": {
      "post": {
        "summary": "user update",
        "tags": ["User"],
        "description": "user update",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/user update"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "User updated successfully"
          },
          "400": {
            "description": "Error in the shipping data"
          },
          "500": {
            "description": "Error in the server"
          }
        }
      }
    },

    "/api/user/delete/{id}": {
      "delete": {
        "summary": "delete user",
        "tags": ["User"],
        "description": "delete user",
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "schema": {
              "type": "string",
              "example": "clvmiz5400000otmaqehdi9w0"
            },
            "required": true,
            "description": "id del producto"
          }
        ],

        "responses": {
          "200": {
            "description": "User deleted successfully"
          },
          "400": {
            "description": "Error in the shipping data"
          },
          "500": {
            "description": "Error in the server"
          }
        }
      }
    },



  },

  // Shemas

  "components": {
    "schemas": {
      "user create": {
        "type": "object",
        "properties": {
          "Name": {
            "type": "string",
            "minLength": 2,
            "maxLength": 20,
            "example": "Diego"
          },
          "LastName": {
            "type": "string",
            "minLength": 2,
            "maxLength": 20,
            "example": "Trujillo"
          },
          "Email": {
            "type": "string",
            "format": "email",
            "example": "example@example.com"
          },
          "Password": {
            "type": "string",
            "minLength": 6,
            "maxLength": 20,
            "example": "123456"
          },
          "Phone": {
            "type": "string",
            "example": "123456789"
          },
          "Address": {
            "type": "string",
            "example": "Calle 25"
          },
          "City": {
            "type": "string",
            "example": "Medellin"
          },

        },
        "required": [
          "name",
          "lastName",
          "email",
          "password",
          "phone",
          "address",
          "city"
        ]
      },


      // user list


      "user list": {
        "type": "object",
        "properties": {

        },


        "required": [

        ]
      },


      // user update

      "user update": {
        "type": "object",
        "properties": {
          "id": { 
            "type": "string",
            "example": "clvmiz5400000otmaqehdi9w0"
          },
          "Name": {
            "type": "string",
            "minLength": 2,
            "maxLength": 20,
            "example": "Diego"
          },
          "LastName": {
            "type": "string",
            "minLength": 2,
            "maxLength": 20,
            "example": "Trujillo"
          },
          "Email": {
            "type": "string",
            "format": "email",
            "example": "example@example.com"
          },
          "Password": {
            "type": "string",
            "minLength": 6,
            "maxLength": 20,
            "example": "123456"
          },
          "Phone": {
            "type": "string",
            "example": "123456789"
          },
          "Address": {
            "type": "string",
            "example": "Calle 25"
          },
          "City": {
            "type": "string",
            "example": "Medellin"
          },

        },
        "required": [
          "name",
          "lastName",
          "email",
          "password",
          "phone",
          "addres",
          "city"
        ]
      },


      // user delete

      "delete user": {
        "type": "object",
        "properties": {

        },
      },
    }
  }

}


module.exports = swaggerAPi;