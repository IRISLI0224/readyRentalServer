const config = require('./src/config/app');
const app = require('./app');
const { connectToDB } = require('./src/loaders/db');

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
