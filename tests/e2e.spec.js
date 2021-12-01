import { validate } from 'uuid';
import {
  getAllUsers, createUser, getUserById, updateUser, deleteUser,
} from './utils.js';

describe('simple CRUD API', () => {
  it('should return empty array', () => {
    getAllUsers()
      .catch((err) => console.log(err))
      .then((data) => { expect(data.persons).toEqual([]); });
  });

  it('should create new person and return correct new person\'s values', () => {
    const newUser = { name: 'Greg', age: 22, hobbies: ['guitar', 'caraoke'] };
    createUser(newUser)
      .catch((err) => console.log(err))
      .then((data) => {
        const { newPerson } = data;
        expect(validate(newPerson.id)).toBe(true);
        expect(newPerson.name).toBe(newUser.name);
        expect(newPerson.age).toBe(newUser.age);
        expect(newPerson.hobbies).toEqual(newUser.hobbies);
      });
  });

  it('should return user\'s data by id (data from create new user test are used)', () => {
    const newUser = { name: 'Alex', age: 33, hobbies: ['guitar', 'cycling'] };
    createUser(newUser)
      .then((data) => data.newPerson.id)
      .then((newPersonID) => getUserById(newPersonID))
      .catch((err) => console.log(err))
      .then((data) => {
        const newPerson = data.person;
        expect(validate(newPerson.id)).toBe(true);
        expect(newPerson.name).toBe(newUser.name);
        expect(newPerson.age).toBe(newUser.age);
        expect(newPerson.hobbies).toEqual(newUser.hobbies);
      });
  });

  it('should update new person and return correct new person\'s values', () => {
    const newUser = { name: 'Mike', age: 44, hobbies: ['guitar'] };
    const newUserUpdate = { name: 'Igor', age: 55, hobbies: ['snooker', 'soccer'] };
    createUser(newUser)
      .then((data) => data.newPerson.id)
      .then((newPersonID) => updateUser(newPersonID, newUserUpdate)
        .then((userUpdate) => ({ newPersonID, userUpdate })))
      .catch((err) => console.log(err))
      .then(({ newPersonID, userUpdate }) => {
        const { person: updatedPerson } = userUpdate;

        expect(validate(updatedPerson.id)).toBe(true);
        expect(updatedPerson.id).toBe(newPersonID);

        expect(updatedPerson.name).toBe(newUserUpdate.name);
        expect(updatedPerson.age).toBe(newUserUpdate.age);
        expect(updatedPerson.hobbies).toEqual(newUserUpdate.hobbies);
      });
  });

  it('should delete new person (delete query should return statusCode 204 and get by id query should not return person)', () => {
    const newUser = { name: 'Mike', age: 44, hobbies: ['guitar'] };
    createUser(newUser)
      .then((data) => data.newPerson.id)
      .then((newPersonID) => deleteUser(newPersonID)
        .then((statusCode) => getUserById(newPersonID)
          .then((deletionData) => ({ deletionData, statusCode }))))
      .catch((err) => console.log(err))
      .then(({ deletionData, statusCode }) => {
        expect(statusCode).toBe(204);
        expect(deletionData.message).toBe('person with given uuid was not found');
      });
  });
});
