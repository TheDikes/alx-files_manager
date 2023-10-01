import sha1 from 'sha1';
import Queue from 'bull';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';
import findUserByToken from '../utils/helper';

const userQu = new Queue('userQu');

class UserController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) return res.status(400).send({ error: 'Missing email' });
    if (!password) return res.status(400).send({ error: 'Missing password' });
    const emailExist = await dbClient.users.findOne({ email });
    if (emailExist) return res.status(400).send({ error: 'Already exist' });

    const securePass = sha1(password);

    const insertedUser = await dbClient.users.insertOne({
      email,
      password: securePass,
    });

    const newUser = {
      id: insertedUser.insertedId,
      email,
    };

    await userQu.add({
      userId: insertedUser.insertedId.toString(),
    });

    return res.status(201).send(newUser);
  }

  static async getMe(req, res) {
    const userId = await findUserByToken(req);

    const user = await dbClient.users.findOne({ _id: ObjectId(userId) });
    if (!user) return res.status(401).send({ error: 'Unauthorized' });

    const userInfo = { id: user._id, ...user };
    delete userInfo._id;
    delete userInfo.password;

    return res.status(200).send(userInfo);
  }
}

export default UserController;
