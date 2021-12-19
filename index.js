const config = require('./src/config/app');
const app = require('./app');
const { connectToDB } = require('./src/loaders/db');
const errorHandler = require('./src/middleware/errorHandler');
const unknownPoint = require('./src/middleware/unknownPoint');

async function startServer() {
  app.listen(config.port, (err) => {
    if (err) {
      process.exit(1);
      return;
    }
    // eslint-disable-next-line no-console
    console.log(
      `############🛡️ Server listening on port: ${config.port} 🛡️ ################################################`,
    );
  });
}
// app.use(unknownPoint)
app.use(errorHandler)

connectToDB()
  .then(() => {
    console.log('DB connected');
    startServer();
  })
  .catch((e) => {
    console.log('DB connection failed');
    console.error(e.message);
    process.exit(1);
  });
