# Knowledge Marketplace

## Overview
The Knowledge Marketplace is a web application that connects users seeking knowledge with experts who can provide answers to their questions. The platform allows users to ask questions, place bids for answers, and interact with experts in real-time.

## Features
- **User Authentication**: Secure login and registration for users.
- **Question Management**: Users can ask questions, and experts can provide answers.
- **Bidding System**: Users can place bids on questions to incentivize experts to respond.
- **Wallet Management**: Users can manage their wallet, including transactions and balance inquiries.
- **Review System**: Users can leave reviews for experts based on their interactions.
- **Moderation Tools**: Moderators can flag inappropriate content and manage user interactions.

## Technologies Used
- **Backend**: Node.js with Express.js, MongoDB with Mongoose for database management.
- **Frontend**: React.js for building user interfaces, Vite as the build tool.
- **Styling**: Tailwind CSS for styling components.
- **Real-time Communication**: WebSockets for chat functionality.

## Project Structure
```
knowledge-marketplace/
├── apps/
│   ├── api/                          # Express.js Backend
│   └── web/                          # React Frontend
├── docker-compose.yml               # Docker Compose
├── .env.example                     # Environment Variables Example
├── package.json                     # Root Package.json
├── README.md                        # Project Documentation
└── .gitignore                       # Git Ignore
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- Docker (optional)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd knowledge-marketplace
   ```

2. Install dependencies for the API:
   ```
   cd apps/api
   npm install
   ```

3. Install dependencies for the frontend:
   ```
   cd ../web
   npm install
   ```

### Running the Application
- To run the backend:
  ```
  cd apps/api
  npm start
  ```

- To run the frontend:
  ```
  cd apps/web
  npm run dev
  ```

### Docker Setup
To run the application using Docker, you can use the provided `docker-compose.yml` file. Make sure to configure your environment variables in the `.env` file.

### Testing
Run tests for the API:
```
cd apps/api
npm test
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.