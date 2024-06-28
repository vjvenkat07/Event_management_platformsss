# Event Management Platform

This project is a basic Event Management Platform built with Node.js and TypeScript. The platform allows you to add, update, delete, retrieve events by their ID, and list all events with optional filters. Events are stored in a JSON file for simplicity.

## Approach

The platform follows a typical MVC (Model-View-Controller) pattern:

1. **Models**: Defines the structure of the event data.
2. **Controllers**: Handles the HTTP requests and responses, interacting with the services to perform CRUD operations.
3. **Services**: Contains the business logic for managing events, including reading from and writing to the JSON file.

### Error Handling

The application includes basic error handling to catch and log errors during CRUD operations. The errors are also sent back to the client as appropriate HTTP responses.

### Data Persistence

Events are stored in a JSON file (`data/events.json`). This file is read and written to using the `fs` module. If the file does not exist, it is created when the application starts.

## Data Structures

### Event

The `Event` interface defines the structure of an event:

interface Event {
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

### Installation

1. Clone the repository:

    git clone https://github.com/vjvenkat07/Event_management_platform.git

    cd Event_management_platform

2. Install dependencies: 

    npm install

3. Running the Application:

    npm start

### Project Structure

Event_management_platform/
|-- dist/
|   |-- controllers/
|   |   |-- eventController.js
|   |-- models/
|   |   |-- event.js
|   |-- routes/
|   |   |-- eventRoutes.js
|   |-- services/
|   |   |-- eventService.js
|   |-- index.js
|-- node_modules/
|-- src/
|   |-- controllers/
|   |   |-- eventController.ts
|   |-- models/
|   |   |-- event.ts
|   |-- routes/
|   |   |-- eventRoutes.ts
|   |-- services/
|   |   |-- eventService.ts
|   |-- index.ts
|-- data/
|   |-- events.json
|-- package.json
|-- tsconfig.json

