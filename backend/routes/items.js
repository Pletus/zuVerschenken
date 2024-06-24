/* import express from 'express';
import multer from 'multer';
import { createItem, getItems, getItemById, updateItem, deleteItem } from '../controllers/items.js';



const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/', createItem);
router.post('/api/items', upload.array('images', 5), createItem);

router.get('/', getItems);

router.get('/:id', getItemById)
router.put( '/:id', updateItem)
router.delete('/:id', deleteItem);

export default router;
 */

import express from 'express';
import multer from 'multer';
import { createItem, getItems, getItemById, updateItem, deleteItem } from '../controllers/items.js';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/', upload.array('images', 5), createItem);

router.get('/', getItems);
router.get('/:id', getItemById);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
