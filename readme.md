# AWS Turboless Architecture Template

### Tags

- Serverless (NodeJS)
- DynamoDB
- Turborepo
- Esbuild

### Software Dependencies

- `Docker` & `Docker Compose` from [docker.com](https://www.docker.com/)
- `NodeJS` from [nodejs.org](https://nodejs.org/en/) - v16
- **Containers, not instalation required**
  - DynamoDB from [aws.amazon.com/dynamodb](https://aws.amazon.com/dynamodb/)

### Get Started

**Install Dependencies**

```sh
# Install package manager

$ npm install -g pnpm
```

```sh
# Install Dependencies

$ pnpm install
```

**Start Application**

```sh
# Start local dependencies (DynamoDB)

$ docker-compose up
```

```sh
# Start Service

$ pnpm dev
```

### Add Resources (CRUD) - Tooling

```sh
# Creates a new resource called documents

$ cd services/api-v1/
$ pnpm resource:add -- --name documents
```

### References

- https://www.serverless.com/framework/docs
- https://aws.amazon.com/dynamodb
- https://esbuild.github.io
- https://turbo.build/repo/docs
- https://pnpm.io/motivation
- https://plopjs.com/documentation/
