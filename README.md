# Doan_Thanh_Loi

Completed problems: problem2, problem4, problem5, problem6

## Getting started

### For frontend: Problem2

- cd frontend
- npm install
- npm run dev

### For backend: Problem4, Problem5, Problem6

- cd backend
- npm install
- npm run dev

## For Problem5: 

Test APIs:

```
Create a user:

[POST] localhost:3000/api/v1/users

body: {
    " user_name": "Loi",
    "phone": "0123456789",
    "address": "HCM"
}
```

```
Get a user by id:

[GET] localhost:3000/api/v1/users/:id
```
```
Get users by filters:

[GET] localhost:3000/api/v1/users/all?user_name=Loi&phone=123456&address=Hanoi
```

```
Update a user by id:

[PUT] localhost:3000/api/v1/users/:id

body: {
    " user_name": "Loi",
    "phone": "0123456789",
    "address": "HCM"
}
```

```
Delete a user by id:

[DELETE] localhost:3000/api/v1/users/:id
```

## For Problem6: 
Diagram to illustrate the flow of execution:

- Create an account ( Optional )
- Login account: After logging in, it will return access_token, open Postman go to Authorization -> Type -> Bearer token and paste access_token into the blank box next to it
- Update scores: access_token is required to perform action


Test account:

- Email: loi@gmail.com

- password: 123


Test APIs:

```
Create an account:

[POST] localhost:3000/api/v1/accounts

body: {
    " email": "loi@gmail.com",
    "password": "123"
}
```

```
Login:

[POST] localhost:3000/api/v1/accounts/login

body: {
    " email": "loi@gmail.com",
    "password": "123"
}
```

```
Update scores: access_token required

[PUT] localhost:3000/api/v1/accounts/update-score
```
