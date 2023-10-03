# User Management API

This is a Node.js application for managing user data through RESTful APIs. It includes endpoints for creating, fetching, updating, and deleting user information.

## Prerequisites

Before running this application, ensure you have the following dependencies installed:

- Node.js
- Express.js
- Sequelize
- MySQL (or another compatible database)

## Setup

1. Clone this repository to your local machine.

2. Install the required npm packages:

   ```bash
   npm install
3. Configure the database by creating a MySQL database and updating the configuration in the `config/db.js` file.

4. Configure JWT Secret Key:

   - In the `config/auth.js` file, replace `"your_secret_key"` with your desired secret key for JWT authentication.

## Usage

Start the application:

```bash
npm start
