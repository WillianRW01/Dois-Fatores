const express = require('express');
const UserApi = require('../api/user');
const authMiddleware = require('../middleware/auth');

const useRouter = express.Router();

useRouter.post('/login', UserApi.login)
useRouter.get('/', authMiddleware(['admin', 'viewer']), UserApi.findUser);
useRouter.post('/admin', authMiddleware(['admin']), UserApi.createUserAdmin);
useRouter.post('/', UserApi.createUserViewer);
useRouter.put('/:id', authMiddleware(), UserApi.updateUser);
useRouter.delete('/:id', UserApi.deleteUser);
useRouter.post('/blockUser/:id', authMiddleware(['admin']), UserApi.blockUser)
useRouter.post('/unblockUser/:id', authMiddleware(['admin']), UserApi.unblockUser)

module.exports = useRouter;