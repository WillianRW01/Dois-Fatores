const express = require('express');
const UserApi = require('../api/user');
const authMiddleware = require('../middleware/auth');

const useRouter = express.Router();

useRouter.post('/login', UserApi.login);
useRouter.post('/verify-access-code', UserApi.verifyAccessCode);
useRouter.post('/', UserApi.createUserViewer);
useRouter.get('/:id', UserApi.findUser);
useRouter.get('/batata', UserApi.batata)
module.exports = useRouter;
