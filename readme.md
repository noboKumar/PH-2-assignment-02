# Vehicle Rental System

**Live Demo:** [https://vehicle-rentsl-system.vercel.app/](https://vehicle-rentsl-system.vercel.app/)

---

## Project Overview

Vehicle Rental System is a full-stack web application that allows customers to browse, book, and manage vehicle rentals, while administrators can manage users, vehicles, and bookings efficiently. The system enforces role-based access and ensures smooth rental operations.

---

## Features

- **User Authentication:** Sign up, login, and secure JWT-based authentication.
- **Role-Based Access Control:**
  - Customers can book vehicles, cancel upcoming bookings, and manage their profiles.
  - Admins can add/update vehicles, manage users, and mark bookings as returned.
- **Vehicle Management:** Add, update, and track vehicle availability.
- **Booking System:** Create bookings with start/end dates, calculate total rental price, and update vehicle status automatically.
- **Responsive UI:** Works on desktop and mobile devices.

---

## Technology Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Vercel

---

## Setup & Usage

### Prerequisites

- Node.js >= 18.x
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/noboKumar/PH-2-assignment-02
   cd vehicle-rental-system
   ```
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables in a .env file:

```bash
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Initialize the database:
```bash
npm run db:init
```
### Running the App

Start the backend server:
```bash
npm run dev
```
Visit the live frontend at: https://vehicle-rentsl-system.vercel.app/