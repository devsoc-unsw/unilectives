FROM oven/bun

ADD src src
ADD migrations migrations 
ADD package.json package.json
ADD bun.lockb bun.lockb
ADD drizzle.config.json drizzle.config.json
RUN bun install

CMD bun start

