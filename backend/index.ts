import express = require("express");
const app = express();
import schema from "./schema/schema";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { createConnection } from "typeorm";

app.use(cors());

app.use(
  "/graphql", // the URL that we will access
  graphqlHTTP({
    schema, // the place where we will define our queries and mutations
    graphiql: true, // automatically provide us with a UI
  }),
);

createConnection()
  .then(() => {
    app.use(
      "/graphql",

      graphqlHTTP({
        schema,

        graphiql: true,
      }),
    );

    app.listen(3100, () => {
      console.log("Server is running at port 3100");
    });
  })

  .catch((err) => {
    console.error("Database connection failed:", err);
  });
