import express from 'express';
import { AppController } from '../controllers/AppController';
import { AuthController } from '../controllers/AuthController';
import { FilesController } from '../controllers/FilesController';
import { UsersController } from '../controllers/UsersController';

const router = express.Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStatus);

router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);

router.get('/users/me', UsersController.getMe);
router.post('/users', UsersController.postNew);

router.get('/files/:id', FilesController.getShow);
router.get('/files', FilesController.getIndex);
router.get('/files/:id/data', FilesController.getFile);
router.post('/files', FilesController.postUpload);
router.put('/files/:id/publish', FilesController.putPublish);
router.put('/files/:id/publish', FilesController.putUnPublish);

export default router;