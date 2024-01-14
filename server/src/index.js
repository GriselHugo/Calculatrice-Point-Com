const port = 4000;
const app = require('./app-config');

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
