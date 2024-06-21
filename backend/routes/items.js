import express from 'express';
import { createItem, getItems, getItemById, updateItem, deleteItem } from '../controllers/items.js';
/* import '/:id'auth from '../middleware/auth.js'; */

const router = express.Router();

router.post('/', createItem);

router.get('/', getItems);

router.get('/:id', getItemById)
router.put( '/:id', updateItem)
router.delete('/:id', deleteItem);

export default router;
