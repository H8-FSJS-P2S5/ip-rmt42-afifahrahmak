[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/IrWObaQs)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12856485&assignment_repo_type=AssignmentRepo)
# Individual Project Phase 2

CYTO is my Individual Project application developed for assignment purposes. 
It is an application ___
This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

# RESTful endpoints


## Users

### POST /register

> Register new user

_Request Header_
```
not needed
```

_URL Params_
```
not needed
```

_Data Params_
```
not needed
```

_Request Body_
```
{
    "username": "string",
    "email": "string",
    "password": "string",
}
```

_Response (201 - Created)_
```
{
    "id": integer,
    "username": "string"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Email cannot be Empty!"
        OR
    "message": "Email should be written in email format!"
        OR
    "message": "Password cannot be Empty!"
        OR
    "message": "Minimum password length is 8"
}
```
---
### POST /login

> User login

_Request Header_
```
not needed
```

_URL Params_
```
not needed
```

_Data Params_
```
not needed
```

_Request Body_
```
{
    "email": "string",
    "password": "string"
}
```

_Response (200 - OK)_
```
{
    "access_token": "string"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Error invalid email or password"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "User not found or Password not matched"
}
```
---

## Recipes
### GET /recipes

> Get all Recipes

_Request Header_
```
{"Authorization": "Bearer <access_token>"}
```

_URL Params_
```
not needed
```

_Data Params_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
    {
        "id": integer,
        "name": "string",
        "description": "string",
        "prepareTime": integer,
        "cookTime": integer,
        "ingredients": [
            "string",
            "string",
            "string",
            "string",
            "string",
            "string",
            "string",
            "string",
            "string",
            "string"
        ],
        "steps": [
            "string",
            "string",
            "string",
            "string",
            "string",
            "string",
            "string",
        ],
        "nutrients": {
            "string": integer,
            "string": integer,
            "string": integer,
            "string": integer,
            "string": integer,
            "string": integer,
            "string": integer,
            "string": integer
        },
        "image": "string"
    },
    ...
]
```



---
### Global Error

_Response (401 - Unauthorized)_
```
{
    "message": "Unauthenticated"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```