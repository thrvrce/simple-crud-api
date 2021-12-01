import http from 'http';
import dotenv from 'dotenv';
import { getRequestBody, getRequestUrlSegments } from './src/utils/request.utils.js';
import createHttpError from './src/utils/createHttpError.js';
import personRouter from './src/resources/person/person.router.js';
import ROUTES from './src/resources/consts/routes.js';

dotenv.config();

const server = http.createServer(async (req, res) => {
  try {
    req.body = await getRequestBody(req);
    const routers = {
      [ROUTES.PERSON]: personRouter,
    };
    const [resource] = getRequestUrlSegments(req.url);
    let routeProcessedSuccesfullly = false;

    if (resource in routers) {
      try {
        routeProcessedSuccesfullly = routers[resource](req, res);
      } catch (err) {
        throw err.status ? err : createHttpError(500, 'Internal Server Error');
      }
    }

    if (!routeProcessedSuccesfullly) {
      throw createHttpError(404, 'Page not found');
    }
  } catch (err) {
    res.writeHead(err.status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: err.message }));
  }
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
