import express from 'express';
import multer from 'multer';
import { createItem, getItems,getTopItems, getItemById, updateItem, deleteItem } from '../controllers/items.js';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/', upload.array('images', 5), createItem);

router.get('/', getItems);
router.get('/top', getTopItems);
router.get('/:id', getItemById);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
