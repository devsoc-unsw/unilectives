# migration 

## Local development

Install required packages: `npm install`

Build and run locally:

```
# Start in development mode:
npm run dev
```

## Build & Deploy

To build: `npm run build`

To run: `npm start`

Test Docker build locally:

```
npm install && npm run build
docker build -t migration .
docker run -p 8080:8080 migration 
```

## Running

```
npm start
```
