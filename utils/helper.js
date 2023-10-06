import redisClient from './redis';

async function getToken(req) {
  const token = req.headers['x-token'];
  return `auth_${token}`;
}

async function findUserByToken(req) {
  const key = await getToken(req);
  const userId = await redisClient.get(key);
  return userId || null;
}

export {
  findUserByToken,
};
