# REST API for Address Management

This project is a simple REST API that provides access to address data stored in a JSON file. It is built using Node.js and Express.

## Project Structure

```
rest-api-app
├── src
│   ├── app.js                # Entry point of the application
│   ├── routes
│   │   └── addresses.js      # Routes for accessing address data
│   ├── controllers
│   │   └── addressController.js # Logic for retrieving address data
│   ├── models
│   │   └── address.js        # Address model definition
│   └── data
│       └── addresses.json    # JSON file containing address data
├── package.json              # npm configuration file
├── .env                      # Environment variables
└── README.md                 # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd rest-api-app
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add any necessary environment variables.

4. Start the application:
   ```
   npm start
   ```

## API Usage

### Get All Addresses

- **Endpoint:** `GET /api/addresses`
- **Description:** Retrieves a list of all addresses.

### Get Address by ID

- **Endpoint:** `GET /api/addresses/:id`
- **Description:** Retrieves a specific address by its ID.

## License

This project is licensed under the MIT License.