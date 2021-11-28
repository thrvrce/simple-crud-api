import personsDataBase from './persons.database.mjs';

const getAllPersons = () => personsDataBase;
const getPersonById = (id) => personsDataBase.filter((person) => person.id === id);

const personsDatabaseApi = {
  getAllPersons,
  getPersonById
}
export default personsDatabaseApi;
