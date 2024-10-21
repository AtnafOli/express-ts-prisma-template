import { Router } from 'express';
import { createName, updateName, deleteName, getResultNames } from '../controllers';
import advancedQuery from '../../../middlewares/advancedQuery';

const router = Router();

// Create a new Name
router.post('/', createName);

// Get all Names with advanced query
router.get('/', advancedQuery('name'), getResultNames);

// Update a Name by ID
router.put('/:id', updateName);

// Delete a Name by ID
router.delete('/:id', deleteName);

export default router;
