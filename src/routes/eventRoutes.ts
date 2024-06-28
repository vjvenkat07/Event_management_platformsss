import { Router } from 'express';
import eventController from '../controllers/eventController';

const router = Router();

router.post('/create-event', eventController.addEvent);
router.put('/update-event/:id', eventController.updateEvent);
router.delete('/delete-event/:id', eventController.deleteEvent);
router.get('/get-event/:id', eventController.getEventById);
router.get('/get-events', eventController.listEvents);

export default router;
