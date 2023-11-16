[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12633437&assignment_repo_type=AssignmentRepo)
# P2-Challenge-1 (Server Side)

<!-- > Tuliskan API Docs kamu di sini -->


> IPustaka is an application that help us to rememorize our materials about JS and React especially in fun way/game based memorize and we can get book from the game.

This app has : 

* RESTful endpoint for asset's CRUD operation
* JSON formatted response
* URL HTTPS : https://restaurant-server.arvinaufal.my.id

&nbsp;

## RESTful endpoints

### POST /register

> Register an account of the application

_Request Header_
```
No needed
```

_Request Params_
```
No needed
```

_Request Body_
```
{
    "username": "string",
    "email": "string",
    "password": "string",
}
```

_Response (201 - Ok)_
```
{
    "id": "integer",
    "email": "string",
    "role": "string"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Username required"
}

            OR

{
    "message": "Email required"
}

            OR

{
    "message": "Password required"
}

            OR

{
    "message": "Must be an email!"
}

            OR

{
    "message": "Password must be at least 5 characters!"
}

```

---

### POST /login

> Login to the application

_Request Header_
```
No needed
```

_Request Params_
```
No needed
```

_Request Body_
```
{
    "email": "string",
    "password": "string",
}
```

_Response (200 - Ok)_
```
{
    "access_token": "string",
    "email": "string",
    "role": "string"
}
```

_Response (400 - Bad Request)_
```

{
    "message": "Email required"
}

            OR

{
    "message": "Password required"
}

            OR

{
    "message": "Use your Google account to login"
}

            OR

{
    "message": "Invalid email/password!"
}

```

---

### Global Error

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal server error"
}
```

### Global Error - For Endpoints Requiring the 'Authorization' Header Only

_Response (401 - Unauthenticated)_

```
{
  "message": "Unauthenticated"
}
```
_Response (403 - Unauthorized)_

```
{
  "message": "You're not authorized"
}
```