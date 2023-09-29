const redis = require('redis');
const { promisify } = require('utils');

class RedisClient {
  constructor () {
    this.client = redis.createClient();

    this.getAsyncFunc = promisify(this.client.get).bind(this.client);

    this.client.on('error', (error) => {
      console.log(`Redis client not connected to the server: ${error.message}`);
    });
  }

  isAlive () {
    return this.client.connected;
  }

  async get (key) {
    return this.getAsyncFunc(key);
  }

  async set (key, value, duration) {
    this.client.setex(key, duration, value);
  }

  async del (key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
