import personsDataBase from './persons.database.mjs';

const getAllPersons = () => personsDataBase;

const getPersonById = (id) => personsDataBase.filter((person) => person.id === id);

const insertNewPerson = (newPerson) => personsDataBase.push(newPerson);

const personsDatabaseApi = {
  getAllPersons,
  getPersonById,
  insertNewPerson,
};

export default personsDatabaseApi;
