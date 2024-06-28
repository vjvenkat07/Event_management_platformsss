import { Request, Response } from 'express';
import eventService from '../services/eventService';

class EventController {
    async addEvent(req: Request, res: Response): Promise<void> {
        try {
            const event = req.body;
            const newEvent = await eventService.addEvent(event);
            res.status(201).json({ data: newEvent, message: 'Event added successfully' });
        } catch (error: any) {
            console.error('Error adding event:', error);
            res.status(500).json({ error: 'Error adding event', message: error.message });
        }
    }

    async updateEvent(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedEvent = req.body;
            const event = await eventService.updateEvent(id, updatedEvent);
            if (event) {
                res.status(200).json({ data: event, message: 'Event updated successfully' });
            } else {
                res.status(404).json({ error: 'Event not found', message: `Event with id ${id} not found` });
            }
        } catch (error: any) {
            console.error('Error updating event:', error);
            res.status(500).json({ error: 'Error updating event', message: error.message });
        }
    }

    async deleteEvent(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const success = await eventService.deleteEvent(id);
            if (success) {
                res.status(200).json({ message: 'Event deleted successfully' });
            } else {
                res.status(404).json({ error: 'Event not found', message: `Event with id ${id} not found` });
            }
        } catch (error: any) {
            console.error('Error deleting event:', error);
            res.status(500).json({ error: 'Error deleting event', message: error.message });
        }
    }

    async getEventById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const event = await eventService.getEventById(id);
            if (event) {
                res.status(200).json({ data: event, message: 'Event retrieved successfully' });
            } else {
                res.status(404).json({ error: 'Event not found', message: `Event with id ${id} not found` });
            }
        } catch (error: any) {
            console.error('Error retrieving event:', error);
            res.status(500).json({ error: 'Error retrieving event', message: error.message });
        }
    }

    async listEvents(req: Request, res: Response): Promise<void> {
        try {
            const { eventName, organizer } = req.query as { eventName?: string, organizer?: string };

            const events = await eventService.listEvents(eventName, organizer);

            res.status(200).json({ data: events, message: 'Events retrieved successfully' });
        } catch (error: any) {
            console.error('Error retrieving events:', error);
            res.status(500).json({ error: 'Error retrieving events', message: error.message });
        }
    }
}

export default new EventController();
