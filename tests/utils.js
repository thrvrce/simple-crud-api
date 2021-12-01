import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;

export const getAllUsers = () => new Promise((resolve, reject) => {
  http.get(`http://localhost:${PORT}/person`, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      resolve(JSON.parse(data));
    });
  })
    .on('error', (err) => {
      reject(err);
    });
});

export const getUserById = (id = '') => new Promise((resolve, reject) => {
  http.get(`http://localhost:${PORT}/person/${id}`, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      resolve(JSON.parse(data));
    });
  })
    .on('error', (err) => {
      reject(err);
    });
});

export const createUser = (newUserData) => new Promise((resolve, reject) => {
  const postData = JSON.stringify(newUserData);

  const options = {
    hostname: 'localhost',
    port: PORT,
    path: '/person',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  const req = http.request(options, (res) => {
    res.setEncoding('utf8');
    let responseData = '';
    res.on('data', (chunk) => {
      responseData += chunk.toString();
    });
    res.on('end', () => {
      resolve(JSON.parse(responseData));
    });
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  req.write(postData);
  req.end();
});

export const updateUser = (id = '', newUserData) => new Promise((resolve, reject) => {
  const postData = JSON.stringify(newUserData);

  const options = {
    hostname: 'localhost',
    port: PORT,
    path: `/person/${id}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  const req = http.request(options, (res) => {
    res.setEncoding('utf8');
    let responseData = '';
    res.on('data', (chunk) => {
      responseData += chunk.toString();
    });
    res.on('end', () => {
      resolve(JSON.parse(responseData));
    });
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  req.write(postData);
  req.end();
});

export const deleteUser = (id = '') => new Promise((resolve, reject) => {
  const options = {
    hostname: 'localhost',
    port: PORT,
    path: `/person/${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const req = http.request(options, (res) => {
    resolve(res.statusCode);
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  req.end();
});
