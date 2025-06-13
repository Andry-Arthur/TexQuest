# TexQuest - LaTeX Writing Contest Platform

TexQuest is a modern web platform designed for hosting LaTeX writing contests, featuring an AI-powered grading system. The platform allows users to submit LaTeX code, view rendered outputs, and receive automated feedback on their submissions.

## Project Structure

The project is organized into three main components:

### 1. Frontend (`/frontend`)
- Built with React and Vite
- Modern UI for contest participation and submission
- Real-time LaTeX rendering
- User-friendly interface for viewing feedback

### 2. Backend (`/backend`)
- Spring Boot application (Java 21)
- RESTful API endpoints
- PostgreSQL database integration
- Handles user management, contest data, and submission processing

### 3. Grader Microservice (`/grader_microservice`)
- Python-based microservice using Flask
- Integrates with Google's Gemini AI for automated grading
- Evaluates LaTeX submissions based on both code and rendered output
- Provides detailed feedback and scoring

## File Structure

```
texquest/
├── frontend/                    # React frontend application
│   ├── src/                    # Source code
│   │   ├── components/        # React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   └── utils/            # Utility functions
│   ├── public/                # Static assets
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite configuration
│   └── eslint.config.js      # ESLint configuration
│
├── backend/                    # Spring Boot backend application
│   ├── src/                   # Source code
│   │   ├── main/
│   │   │   ├── java/         # Java source files
│   │   │   └── resources/    # Application resources
│   │   └── test/             # Test files
│   ├── pom.xml               # Maven configuration
│   └── mvnw                  # Maven wrapper
│
├── grader_microservice/       # Python-based grading service
│   ├── ai_grader.py          # Main grading service
│   └── requirements.txt      # Python dependencies
│
├── .gitignore                # Git ignore rules
└── README.md                # Project documentation
```

## Prerequisites

- Node.js (v18 or higher)
- Java 21
- Python 3.8+
- PostgreSQL
- Google Cloud account (for Gemini API access)

## Setup Instructions

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
./mvnw spring-boot:run
```

### Grader Microservice Setup
```bash
cd grader_microservice
pip install -r requirements.txt
# Set up GEMINI_API_KEY in .env file
python ai_grader.py
```

## Environment Variables

Create the following `.env` files:

### Frontend
```
VITE_API_URL=http://localhost:8080
```

### Backend
```
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/texquest
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password
```

### Grader Microservice
```
GEMINI_API_KEY=your_gemini_api_key
```

## Development Workflow

1. **Frontend Development**
   - Use `npm run dev` for local development
   - The frontend runs on `http://localhost:5173` by default
   - ESLint is configured for code quality

2. **Backend Development**
   - Spring Boot DevTools enabled for hot reloading
   - JPA repositories for database operations
   - REST controllers for API endpoints

3. **Grading System**
   - The AI grader evaluates submissions based on:
     - Mathematical correctness
     - Visual equivalence
     - LaTeX code quality
   - Provides detailed feedback and scoring (0-100)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Testing

- Frontend: `npm run test`
- Backend: `./mvnw test`
- Grader: Manual testing with sample submissions

## License

Copyright (c) 2024 Andry Rakotonjanabelo. All rights reserved.

This software and associated documentation files (the "Software") are proprietary and confidential. 
The Software is protected by copyright laws and international copyright treaties, as well as other 
intellectual property laws and treaties.

No part of this Software may be reproduced, distributed, or transmitted in any form or by any means, 
including photocopying, recording, or other electronic or mechanical methods, without the prior 
written permission of the copyright holder.

Unauthorized copying, modification, distribution, or use of this Software, via any medium, is 
strictly prohibited and will be prosecuted to the maximum extent possible under the law.

## Support

### Contact Information
- **Author:** Andry Rakotonjanabelo
- **Email:** andry1arthur@gmail.com

### Getting Help
- For bug reports, please include:
  - A clear description of the issue
  - Steps to reproduce the problem
  - Expected vs actual behavior
  - Screenshots if applicable

### Response Time
- Business hours: 9 AM - 5 PM (GMT+3)
- Typical response time: 24-48 hours

### Security Issues
For security-related concerns, please email directly with "SECURITY" in the subject line.