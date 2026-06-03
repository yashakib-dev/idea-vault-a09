# IdeaVault

A modern startup idea sharing platform where users can discover, share, manage, and discuss innovative startup ideas.

## Live Links

- Live Demo: https://idea-vault-a09.vercel.app/
- Client Repository: https://github.com/yashakib-dev/idea-vault-a09
- Server Repository: https://github.com/yashakib-dev/idea-vault-a09-server
- Backend API: https://idea-vault-a09-server.vercel.app/

## Preview

![Project Screenshot](./public/assets/preview.png)

## Demo Credentials

- **User Email:** demo.user@example.com  
- **User Password:** Demo@12345  

> Note: Demo credentials are for testing purposes only. Do not use real user data.

## Project Overview

IdeaVault is a full-stack startup idea sharing platform designed for entrepreneurs, innovators, and startup enthusiasts. Users can securely authenticate, publish startup ideas, interact through comments, and manage their own content. The platform provides an intuitive and responsive user experience with search, filtering, personalized profiles, and idea management features.

## Key Features

- Secure Email/Password and Google Authentication
- JWT-based authentication and protected private routes
- Create, read, update, and delete startup ideas
- Interactive comment system with edit and delete functionality
- Search and filter ideas by title and category
- Dynamic user profile with contribution statistics
- Light and dark theme support
- Responsive design for mobile, tablet, and desktop devices
- Loading states and custom 404 page for improved user experience

## Tech Stack

### Frontend
- Next.js
- Tailwind CSS
- DaisyUI
- Better Auth
- React Icons
- React Hot Toast
- Swiper

### Backend
- Node.js
- Express.js
- MongoDB

### Authentication & Security
- JWT (JSON Web Token)
- JOSE
- Better Auth
- Google Authentication

### Deployment
- Vercel

### Tools
- Git
- GitHub
- VS Code

## Main Pages

- Home Page
- All Ideas Page
- Idea Details Page
- Add Idea Page
- My Ideas Page
- My Interactions Page
- Profile Page
- Login Page
- Register Page


## Setup Instructions
1. Clone the repository
```bash
git clone https://github.com/yashakib-dev/idea-vault-a09.git
```
2. Install dependencies
```bash
npm install
```
3. Create a .env file using .env.example
```bash
API_URL=https://idea-vault-a09-server.vercel.app

```
4. Run the project
```bash
npm run dev
```


## Testing
- User can register and log in
- Protected routes redirect unauthenticated users
- User can create, update, and delete data
- Data loads correctly
- Mobile layout works properly


## Author
Name: Yeakub Ali Shakib <br>
Portfolio: https://ya-shakib-portfolio.vercel.app/ <br>
LinkedIn: https://www.linkedin.com/in/yashakib/ <br>
GitHub: https://github.com/yashakib-dev
