const config = require('./src/config/app');
const app = require('./app');

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
startServer();
