# cselectives-api

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
docker build -t cselectives-api .
docker run -p 3030:3030 cselectives-api
```

## Running

```
npm start
```

## Conventions

### Filenames

- Classes - {PascalCase}.ts
- Interfaces - I{PascalCase}.ts (Do prefix with I)
- Routers - {PascalCase}.router.ts
- Services - {PascalCase}.service.ts
- Schemas - {PascalCase}.schema.ts
