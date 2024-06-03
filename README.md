# Online Store API

This project is an online storefront API built with Node.js, Express, and PostgreSQL. It allows users to browse products, view the specifics of a single product, add products to an order, and view their order in a cart.

## Getting Started

### Prerequisites

- Node.js and npm installed
- Docker installed and running

### Installation

#### Set up environment variables:

Create a `.env` file in the root directory and add the following:

```env
PORT=3000
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=online_store
POSTGRES_USER=test_user
POSTGRES_PASSWORD=test_user
JWT_SECRET=your_jwt_secret
BCRYPT_PASSWORD=harrty_H2@1p
BCRYPT_SALT_ROUNDS=10
```

#### Set up the database:

Open a new terminal and get to the project root repository!

Setup PostgreSQL database
```bash
docker-compose up -d
```

The database will run on port 5432. 

#### Install the dependencies:

```bash
npm install
```

### Running the database migration:

Run the database migrations:

```bash
npm run db-up
```

### Running the Server:

Start the server:

```bash
npm run start
```

The server will run on port 3000 (unless you change it in in `.env`), From now you can navigate in the server! `http://localhost:3000`.

### Running Tests

Run the Jasmine tests:

```bash
npm run test
```

## API Endpoints

### Users

- `POST /users`: Create a new user
- `GET /users`: Get all users (token required)
- `GET /users/:id`: Get a user by ID (token required)

### Products

- `POST /products`: Create a new product (token required)
- `GET /products`: Get all products
- `GET /products/:id`: Get a product by ID

### Orders

- `POST /orders` Create a Order [token required]
- `POST /orders/:order_id/products` Add Product to a Order [token required]
- `GET /orders/current/:user_id`: Get current order by user (token required)
- `GET /orders/completed/:user_id`: Get completed orders by user (token required)

## Postman Collection

To make it easier to test the API, you can use the provided Postman collection.

### Importing the Postman Collection

1. Download the [Online Store API Postman Collection](./Online_Store_API.postman_collection.json).

2. Open Postman.

3. Click on "Import" in the top left corner.

4. Choose the `Online_Store_API.postman_collection.json` file and import it.

5. The collection will be added to your Postman, and you can use the endpoints to test the API.

### Using the Postman Collection

1. **Create a User**:
- Open the `Create User` request in the `Users` folder.
- Click on "Send".

2. **Test Other Endpoints**:
- Use the other requests in the collection to test the API. Make sure the `jwt_token` variable is set for requests that require authentication.

## Deconstruction

1. Run `npm run db-down` to drop the regular database tables.
2. Run `docker-compose down -v` to delete the databases