# EventVibe
EventVibe is a full-stack web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides a platform for users to discover and engage with various events. 
## Features

- **Event Exploration**: Visitors can browse through a comprehensive list of available events, each with detailed information such as date, time, location, and description.
- **User Authentication**: Users can sign up and choose between two roles: Admin or User. Each role comes with its own set of privileges.
- **Event Booking**: Members can reserve spots for events they're interested in attending, securing their participation.
- **Google Calendar Integration**: Users can seamlessly add booked events to their Google Calendar, ensuring they stay organized and never miss an event.
- **Admin Privileges**: Admins have additional capabilities beyond regular users. They can create new events, manage existing ones, and oversee the overall functioning of the platform.

# Local Setup:

1. **Clone the repository**: `git clone https://github.com/ShainiAnil/events-platform.git`
2. **Install dependencies**: `cd client && npm install` (repeat this step in both the client and server directories)
3. **Set up environment variables**: Create a `.env` file in the server directory and define variables like MONGO_URI, CLIENT_ID, CLIENT_SECRET etc.
4. **Run the application**:
   - Start the server: `cd server && npm run dev`
   - Start the client: `cd client && npm run dev`


