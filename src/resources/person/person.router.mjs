import { Router } from 'express';
import {
  getAllPersons, getPersonById, createNewPerson, patchPersonById, deletePersonById,
} from './person.service.mjs';
import createHttpError from '../../utils/createHttpError.mjs';

const personRouter = Router({ mergeParams: true });

personRouter.get('/', async (req, res, next) => {
  try {
    const { statusCode, payload } = getAllPersons();
    res.status(statusCode);
    res.json(payload);
  } catch (err) {
    next(createHttpError(500, 'Internal Server Error'));
  }
});

personRouter.get('/:personId', async (req, res, next) => {
  try {
    const { statusCode, payload } = getPersonById(req.params.personId);
    res.status(statusCode);
    res.json(payload);
  } catch (err) {
    next(createHttpError(500, 'Internal Server Error'));
  }
});

personRouter.post('/', async (req, res, next) => {
  try {
    const { statusCode, payload } = createNewPerson(req.body);
    res.status(statusCode);
    res.json(payload);
  } catch (err) {
    next(createHttpError(500, 'Internal Server Error'));
  }
});

personRouter.put('/:personId', async (req, res, next) => {
  try {
    const { statusCode, payload } = patchPersonById(req.params.personId, req.body);
    res.status(statusCode);
    res.json(payload);
  } catch (err) {
    next(createHttpError(500, 'Internal Server Error'));
  }
});

personRouter.delete('/:personId', async (req, res, next) => {
  try {
    const { statusCode, payload } = deletePersonById(req.params.personId);
    res.status(statusCode);
    res.json(payload);
  } catch (err) {
    next(createHttpError(500, 'Internal Server Error'));
  }
});
export default personRouter;
