# Security Scanning Challenge

This projects aims for adding and checking security scanning results.

## Folder Structure

- [api]()
- [dashboard]()
- [docker-compose.yml]()
- [README.md]()

## To run server:

Please do the following instructions for node.js application.

- cd api
- npm install
- npm run start ( To run )
- npm run build ( To build )
- npm run test ( To test )

## API Reference

#### Get all scanning results

```http
  GET /api/v1/results
```

#### Post a new scanning result

```http
  POST /api/v1/results
```

#### Get scanning result

```http
  GET /api/v1/results/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Update result

```http
  PUT /api/v1/results/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of item to update |

#### Delete result

```http
  DELETE /api/v1/results/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of item to delete |

## To Run Client

Please do the following instructions for react.js application.

- cd dashboard
- npm install
- npm start ( To run )
- npm run build ( To build )
- npm run test ( To test )

## Run Locally

Clone the project

```bash
  git clone https://github.com/myat-hsu-mon/monorepo
```

Go to the project directory

```bash
  cd monorepo
```

Install dependencies

```bash
  docker-compose up
```

Start the server on your browser

```bash
  http://localhost:3000
```
