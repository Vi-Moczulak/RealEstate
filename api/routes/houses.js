const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');

const HouseController = require('../controllers/houses');


router.get('/', HouseController.houses_get_all);

router.get('/filters', HouseController.houses_get_by_filters);

router.post('/', checkAuth, HouseController.houses_add_new);

router.get('/:houseId', HouseController.houses_get_by_id);

router.put('/:houseId', checkAuth, HouseController.houses_change);

router.delete('/filters', checkAuth, HouseController.house_delete_by_filters);

router.delete('/:houseId', checkAuth, HouseController.house_delete);

module.exports = router;
