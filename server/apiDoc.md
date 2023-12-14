# CS2 Music Kit Reviewer API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /auth/googleLogin`
- `GET /musicKits`
- `GET /musicKits/:id`
- `GET /inventories`
- `POST /inventories/:id`
- `DELETE /inventories/:id`
- `GET /payment/midtrans/token/:id`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "`New user with id: 2 and email: trial@gmail.com created`"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Must follows email format"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid email or password"
}
```

&nbsp;

## 3. POST /auth/googleLogin

Description:
- Login using google OAuth. Create a user entry for first time login.

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "id": "integer",
  "email": "string"
}
```

&nbsp;

## 4. GET /musicKits

Description:
- Fetch all music kits data

Request:

- headers:

```json
{
  "Authorization": "string"
}
```

_Response (200 - OK)_

```json
[

    {
    "id": 2,
    "name": "Aggressive",
    "artist": "Beartooth",
    "description": "Beartooth is back for round two. This new music kit hits harder and is even more aggressive. We've also made the MVP anthem extra heavy so your opponents feel really bad after they've lost to you.",
    "imageUrl": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXO9B9WLbU5oA9OA07VRva52MDHW2Ikd0oBs7n2KF41i6aeJmwQtNjvwNTewvGjMOiFwzJTupdwjruRo9302Qa35QMyNN37aweL/256fx256f",
    "bomb10Second": "https://csgostash.com/storage/mp3/30/bombtenseccount.mp3",
    "bombPlanted": "https://csgostash.com/storage/mp3/30/bombplanted.mp3",
    "chooseTeam": "https://csgostash.com/storage/mp3/30/chooseteam.mp3",
    "deathCam": "https://csgostash.com/storage/mp3/30/deathcam.mp3",
    "lostRound": "https://csgostash.com/storage/mp3/30/lostround.mp3",
    "mvpAnthem": "https://csgostash.com/storage/mp3/30/roundmvpanthem.mp3",
    "mainMenu": "https://csgostash.com/storage/mp3/30/mainmenu.mp3",
    "round10Second": "https://csgostash.com/storage/mp3/30/roundtenseccount.mp3",
    "startAction1": "https://csgostash.com/storage/mp3/30/startaction_01.mp3",
    "startAction2": "https://csgostash.com/storage/mp3/30/startaction_02.mp3",
    "startAction3": "",
    "startRound1": "https://csgostash.com/storage/mp3/30/startround_01.mp3",
    "startRound2": "https://csgostash.com/storage/mp3/30/startround_02.mp3",
    "startRound3": "",
    "wonRound": "https://csgostash.com/storage/mp3/30/wonround.mp3",
    "price": 784258,
    "createdAt": "2023-11-14T11:22:04.115Z",
    "updatedAt": "2023-11-14T11:22:04.115Z"
    }
...,
]
```

&nbsp;

## 5. GET /musicKits/:id

Description:
- Fetch single music kit data based on id

Request:

- headers:

```json
{
  "Authorization": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
    "id": 2,
    "name": "Aggressive",
    "artist": "Beartooth",
    "description": "Beartooth is back for round two. This new music kit hits harder and is even more aggressive. We've also made the MVP anthem extra heavy so your opponents feel really bad after they've lost to you.",
    "imageUrl": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXO9B9WLbU5oA9OA07VRva52MDHW2Ikd0oBs7n2KF41i6aeJmwQtNjvwNTewvGjMOiFwzJTupdwjruRo9302Qa35QMyNN37aweL/256fx256f",
    "bomb10Second": "https://csgostash.com/storage/mp3/30/bombtenseccount.mp3",
    "bombPlanted": "https://csgostash.com/storage/mp3/30/bombplanted.mp3",
    "chooseTeam": "https://csgostash.com/storage/mp3/30/chooseteam.mp3",
    "deathCam": "https://csgostash.com/storage/mp3/30/deathcam.mp3",
    "lostRound": "https://csgostash.com/storage/mp3/30/lostround.mp3",
    "mvpAnthem": "https://csgostash.com/storage/mp3/30/roundmvpanthem.mp3",
    "mainMenu": "https://csgostash.com/storage/mp3/30/mainmenu.mp3",
    "round10Second": "https://csgostash.com/storage/mp3/30/roundtenseccount.mp3",
    "startAction1": "https://csgostash.com/storage/mp3/30/startaction_01.mp3",
    "startAction2": "https://csgostash.com/storage/mp3/30/startaction_02.mp3",
    "startAction3": "",
    "startRound1": "https://csgostash.com/storage/mp3/30/startround_01.mp3",
    "startRound2": "https://csgostash.com/storage/mp3/30/startround_02.mp3",
    "startRound3": "",
    "wonRound": "https://csgostash.com/storage/mp3/30/wonround.mp3",
    "price": 784258,
    "createdAt": "2023-11-14T11:22:04.115Z",
    "updatedAt": "2023-11-14T11:22:04.115Z"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data not found"
}
```

&nbsp;

## 6. GET /inventories

Description:
- Fetch user's invetory data

Request:

- headers:

```json
{
  "Authorization": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 2,
        "UserId": 1,
        "MusicId": 6,
        "createdAt": "2023-11-16T05:07:27.115Z",
        "updatedAt": "2023-11-16T05:07:27.115Z",
        "MusicKit": {
            "id": 6,
            "name": "Astro Bellum",
            "artist": "Jesse Harlin",
            "description": "Composer Jesse Harlin delivers bombastic space opera drama inspired by classic sci-fi of the 70s, 80s, and beyond.",
            "imageUrl": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXO9B9WLbU5oA9OA0bVVPeo387BX1R6GlQG-OLzcl9hgKHLdThA7tmzxdbZxaL3YeiAlGpVvccl2LuToNr03FCyrkFyIzekDQ3O7jo/256fx256f",
            "bomb10Second": "https://csgostash.com/storage/mp3/55/bombtenseccount.mp3",
            "bombPlanted": "https://csgostash.com/storage/mp3/55/bombplanted.mp3",
            "chooseTeam": "https://csgostash.com/storage/mp3/55/chooseteam.mp3",
            "deathCam": "https://csgostash.com/storage/mp3/55/deathcam.mp3",
            "lostRound": "https://csgostash.com/storage/mp3/55/lostround.mp3",
            "mvpAnthem": "https://csgostash.com/storage/mp3/55/roundmvpanthem.mp3",
            "mainMenu": "",
            "round10Second": "https://csgostash.com/storage/mp3/55/roundtenseccount.mp3",
            "startAction1": "",
            "startAction2": "",
            "startAction3": "",
            "startRound1": "",
            "startRound2": "",
            "startRound3": "",
            "wonRound": "https://csgostash.com/storage/mp3/55/wonround.mp3",
            "price": 285664,
            "createdAt": "2023-11-14T11:22:04.115Z",
            "updatedAt": "2023-11-14T11:22:04.115Z"
        }
    },
...,
]
```

&nbsp;

## 7. POST /inventories/:id

Description:
- Add a music kit into user's inventory
- This process requires the user to complete a payment using midtrans

Request:

- headers:

```json
{
  "Authorization": "string"
}
```

- body:

```json
{
  "orderId": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Added Mocha Petal to your inventory"
}
```

_Response (402 - Payment Required)_

```json
{
  "message": "Transaction failed"
}
```

&nbsp;

## 8. DELETE /inventories/:id

Description:
- Delete a music kit from user's inventory
- This process requires item owner's authorization

Request:

- headers:

```json
{
  "Authorization": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success deleting item from inventory"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 9. GET /payment/midtrans/token/:id

Description:
- Payment gateway using midtrans
- Each transaction will create an order entry in the database
- Transaction is fully completed when the order status is "paid"

Request:

- headers:

```json
{
  "Authorization": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "transaction_token": "string",
  "orderId": "string"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthenticated"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```