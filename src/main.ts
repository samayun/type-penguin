import 'dotenv/config';

/**
 * load configuration for the application server
 */
import serverConfig from '@/config/server';

/**
 * load route & db connected express app instaance
 */
import app from './app';

/**
 * Start the server
 */
async function bootstrap() {
  app.listen(serverConfig.port);

  console.info(
    '\x1b[47m\x1b[46m%s\x1b[0m',
    `🧠 Server running on 👀`,
    '\x1b[1m\x1b[5m',
    `${serverConfig.host}:${serverConfig.port} 🐦`,
  );
}

bootstrap();
