import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

const Routing = express.Router();

// the get Routes
Routing.get('/status', AppController.getStatus);
Routing.get('/stats', AppController.getStats);
Routing.get('/connect', AuthController.getConnect);
Routing.get('/disconnect', AuthController.getDisconnect);
Routing.get('/users/me', UsersController.getMe);
Routing.get('/files/:id', FilesController.getShow);
Routing.get('/files', FilesController.getIndex);

// the post Routes
Routing.post('/users', UsersController.postNew);
Routing.post('/files', FilesController.postUpload);

module.exports = Routing;
