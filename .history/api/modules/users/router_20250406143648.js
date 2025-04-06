import express from 'express';
import userstbl from './userstbl';

const router = express.Router({ caseSensitive: true });


router.get('/login', employeetbl.listEmployee);
module.exports = router;
