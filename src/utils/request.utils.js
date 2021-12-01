export const getRequestBody = (req) => new Promise((resolve, reject) => {
  try {
    let requestBody = '';

    req.on('data', (chunk) => {
      requestBody += chunk.toString();
    });

    req.on('end', () => {
      if (requestBody) {
        resolve(JSON.parse(requestBody));
      } else {
        resolve({});
      }
    });

    req.on('error', (error) => {
      reject(error);
    });
  } catch (error) {
    reject(error);
    req.destroy();
  }
});

export const getRequestUrlSegments = (requestUrl) => requestUrl.replace(/\//g, ' ').trim().split(' ').map((segment) => segment.toLowerCase());
