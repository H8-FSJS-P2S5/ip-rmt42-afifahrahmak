[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/IrWObaQs)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12856485&assignment_repo_type=AssignmentRepo)
# Individual Project Phase 2

CYTO is my Individual Project developed for assignment purposes. 
It is an application that can be accessed here:
* https://cyto-project-b7bd1.web.app/
* https://cyto-project-b7bd1.firebaseapp.com/


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

### POST /google-login

> User login via Google Account

_Request Header_
```
"g_token"
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
    "username": "string",
    "password": "string"
}
```

_Response (200 - OK)_
```
{
    "access_token": "string"
}
```
---

## Recipes
### GET /recipes

> Get All Recipes

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
        "id": "string",
        "name": "string",
        "description": "string",
        "prepareTime": "string",
        "cookTime": "string",
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
### GET /recipe/:id

> Get One Recipe by Id

_Request Header_
```
{"Authorization": "Bearer <access_token>"}
```

_URL Params_
```
id: integer [required]
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
{
    "id": "string",
    "name": "string",
    "description": "string",
    "prepareTime": "string",
    "cookTime": "string",
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
}
```

_Response (404 - Not Found)_
```
{
    "message": "Recipe not found"
}
```

---
## Mail Sending

### POST /contact-mail

> Send Message to the CYTO team

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
{ 
    "username":"string", 
    "email": "string", 
    "message": "string" 
}
```

_Response (200 - OK)_
```
{
    "message": "Your message sent successfully"
}

```

_Response (400 - Bad Request)_
```
{
    "message": "Please fill the required form!"
}
```
---

## Comment

### GET /comment

> Get all comments/posts

_Request Header_
```
{"Authorization": "Bearer <your access token>"}
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
        "imgUrl": "string",
        "username": "string",
        "description": "string",
        "userId": integer
        "createdAt": "date",
        "updatedAt": "date"
    },
    ...
]
```
---

### POST/comment/add

> Create new comment/post

_Request Header_
```
{"Authorization": "Bearer <your access token>"}
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
    "imgUrl": "string",
    "username": "string",
    "description": "string",
    "userId": integer
}
```

_Response (201 - Created)_
```
{
    "id": integer,
    "username": "string",
    "description": "string",
    "userId": integer,
    "createdAt": "date",
    "updatedAt": "date"
}
```
---
### PUT /comment/edit/:id

> Edit comment/post by id

_Request Header_
```
{"Authorization": "Bearer <your access token>"}
```

_URL Params_
```
id: integer [required]
```

_Data Params_
```
not needed
```

_Request Body_
```
{
    "description": "string",
}
```

_Response (201 - Created)_
```
{
    "id": integer,
    "username": "string",
    "description": "string",
    "userId": integer,
    "createdAt": "date",
    "updatedAt": "date"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Comment not found"
}
```
---
### DELETE /comment/delete/:id

> Delete comment/post by id

_Request Header_
```
{"Authorization": "Bearer <your access token>"}
```

_URL Params_
```
id: integer [required]
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
{
    "message": "Comment success to delete"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Comment not found"
}
```

---

### Global Error

_Response (401 - Unauthorized)_
```
{
    "message": "Unauthenticated"
}
```

_Response (403 - Forbidden)_
```
{
    "message": "You are not authorized"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```