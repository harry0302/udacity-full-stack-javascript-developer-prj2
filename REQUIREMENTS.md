# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index  -- 'products' [GET]
- Show -- 'products/id/:id' [GET]
- Create [token required] -- 'products' [POST]

#### Users
- Index [token required] -- 'users' [GET]
- Show [token required] -- 'users/:id' [GET]
- Create -- 'users' [POST]

#### Orders
- Create a Order [token required] -- 'orders' [POST]
- Add Product to a Order [token required] -- 'orders/:id/products' [POST]
- Current Order by user (args: user id)[token required]  -- 'orders/current/:user_id' [GET]
- Completed Orders by user (args: user id)[token required] -- 'orders/completed/:user_id' [GET]

## Data Shapes
#### Product
- id
- name
- price
- category

Table: products (id:serial primary key, name:varchar, price:integer, category:varchar)

#### User
- id
- first_name
- last_name
- password

Table: users (id:serial primary key, first_name:varchar, last_name:varchar, password:varchar)
#### Orders
- id
- user_id
- order_status (active or complete)

Table: orders (id:serial primary key, user_id:[foreign key to users table], order_status: varchar)

### Orders_Products
- id
- quantity
- order_id
- product_id 

Table: orders_products (id:serial primary key, quantity: integer, order_id:[foreign key to orders table], product_id: [foreign key to products table]