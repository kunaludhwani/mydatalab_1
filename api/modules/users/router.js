import express from 'express';
import userstbl from './userstbl';

const router = express.Router({ caseSensitive: true });


router.post('/login', userstbl.getUser);
module.exports = router;
