# Build with
# docker build -t cselectives-api .

FROM node:12.18.2-alpine3.11

COPY config/ $HOME/config/
COPY dist/ $HOME/dist/
COPY node_modules/ $HOME/node_modules/

ENV GIT_COMMIT local

USER 1001

EXPOSE 3001

CMD ["node", "dist/index.js"]