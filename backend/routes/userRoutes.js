import express from 'express'
import { check_username, getAllCountries, getAllStates, getAllCities, updateUser } from '../controller/user.controller.js';
import { singleUpload } from '../middleware/multer.js';

const router = express.Router();

router.route('/check-username/:username').get(check_username);
router.route('/countries').get(getAllCountries);
router.route('/states/:country').get(getAllStates);
router.route('/cities/:country/:state').get(getAllCities);
router.route('/update-profile').post(singleUpload,updateUser );

export default router;
