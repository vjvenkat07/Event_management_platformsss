import { Event } from "../models/event";
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const filePath = path.join(__dirname, '../data/events.json');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

class EventService {
    private events: Event[] = [];

    constructor() {
        this.loadEvents();
    }

    private async loadEvents(): Promise<void> {
        try {
            const data = await readFile(filePath, 'utf-8');
            if (data) this.events = JSON.parse(data) || [];
        } catch (error: any) {
            // If the file does not exist, initialize with an empty array
            if (error.code === 'ENOENT') {
                this.events = [];
                await this.saveEvents();
            } else {
                throw error;
            }
        }
    }

    private async saveEvents(): Promise<void> {
        try {
            await writeFile(filePath, JSON.stringify(this.events, null, 2));
        } catch (error) {
            console.error('Error saving events:', error);
            throw error;
        }
    }

    public async addEvent(event: Event): Promise<Event> {
        try {
            const newEvent: Event = {
                ...event,
                id: uuidv4(),
                createdAt: new Date(),
                updatedAt: new Date()
            };
            this.events.push(newEvent);
            await this.saveEvents();
            return newEvent;
        } catch (error) {
            console.error('Error adding event:', error);
            throw error;
        }
    }

    public async updateEvent(id: string, updatedEvent: Event): Promise<Event | null> {
        try {
            const index = this.events.findIndex(event => event.id === id);
            if (index === -1) {
                return null;
            }
            this.events[index] = { ...this.events[index], ...updatedEvent, updatedAt: new Date() };
            await this.saveEvents();
            return this.events[index];
        } catch (error) {
            console.error('Error updating event:', error);
            throw error;
        }
    }

    public async deleteEvent(id: string): Promise<boolean> {
        try {
            const index = this.events.findIndex(event => event.id === id);
            if (index === -1) {
                return false;
            }
            this.events.splice(index, 1);
            await this.saveEvents();
            return true;
        } catch (error) {
            console.error('Error deleting event:', error);
            throw error;
        }
    }

    public async getEventById(id: string): Promise<Event | null> {
        try {
            return this.events.find(event => event.id === id) || null;
        } catch (error) {
            console.error('Error retrieving event:', error);
            throw error;
        }
    }

    public async listEvents(eventName?: string, organizer?: string): Promise<Event[]> {
        try {
            const filteredEvents = (eventName || organizer ) ? this.events.filter(event =>
                (eventName && event.eventName.toLowerCase().includes(eventName.toLowerCase())) ||
                (organizer && event.organizer.toLowerCase().includes(organizer.toLowerCase()))
            ) : this.events

            return filteredEvents;
        } catch (error) {
            console.error('Error listing events:', error);
            throw error;
        }
    }

}

export default new EventService();
