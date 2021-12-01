import {
  getAllPersons, getPersonById, createNewPerson, patchPersonById, deletePersonById,
} from './person.service.js';
import { getRequestUrlSegments } from '../../utils/request.utils.js';

const personRouter = (req, res) => {
  const reqUrlSegments = getRequestUrlSegments(req.url);
  const personId = reqUrlSegments[1];
  let result;

  if (personId) {
    if (req.method === 'GET') {
      result = getPersonById(personId);
    } else
    if (req.method === 'PUT') {
      result = patchPersonById(personId, req.body);
    } else
    if (req.method === 'DELETE') {
      result = deletePersonById(personId);
    }
  } else if (reqUrlSegments.length === 1) {
    if (req.method === 'GET') {
      result = getAllPersons();
    } else
    if (req.method === 'POST') {
      result = createNewPerson(req.body);
    }
  }

  if (result) {
    const { statusCode, payload } = result;
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(payload));
    return true;
  }

  return false;
};

export default personRouter;
