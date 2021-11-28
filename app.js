const express = require('express');

const app = express();

app.use(express.json());


app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/person', async (req, res) => {
  res.json({message: "hello from person route"})
  res.status(200)
});

const PORT = 3000
app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
