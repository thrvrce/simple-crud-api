# simple-crud-api

API start:
1. install all packages using command `npm i` inside project's root folder.
2. set PORT env variable inside .env file in root folder. For example `PORT=3000`.
3. run script `npm run start:prod`

Query examples:
1. **Get all persons** `GET http://localhost:3000/person/`. (empty by default)
2. **Get person by id** `GET http://localhost:3000/person/6a0e7516-8504-4ba1-b81d-431ccb681920`.
3. **Create person** `POST http://localhost:3000/person/`. Payload example for Postman(JSON): `{
    "name": "Greg",
    "age": 36,
    "hobbies": [
        "guitar",
        "karaoke"
    ]
}`.  All properties are required.
4. **Update person's information** `PUT http://localhost:3000/person/6a0e7516-8504-4ba1-b81d-431ccb681920`. Payload example for Postman(JSON): `{
    "name": "Alex",
    "age": 37,
    "hobbies": [
        "guitar",
        "karaoke"
    ]
}`. You can omit some properties.
5. **Delete profile by id** `DELETE PUT http://localhost:3000/person/6a0e7516-8504-4ba1-b81d-431ccb681920`. It will delete profile by given id if it exists.

To run e2e tests firstly start server using `start:prod` and then `npm run test`. If retesting needed, reload server firstly in order to clean stored data from previous tests
