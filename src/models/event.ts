export interface Event {
    id: string;
    eventName: string;
    eventDate: Date;
    organizer: string;
    email: string;
    phone: string;
    location: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    createdAt: Date;
    updatedAt: Date;
  }
  