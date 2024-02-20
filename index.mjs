import express from "express";
import cors from "cors";
import { createHandler } from "graphql-http/lib/use/express";
import expressPlayground from "graphql-playground-middleware-express";
import { schema } from "./schema.mjs";

const PORT = 5000;

const app = express();

app.use(cors());

const users = [
  {
    id: 1,
    username: "username",
    age: 20,
  },
];
const createUser = (input) => {
  const id = Date.now();
  return { id, ...input };
};
const root = {
  // resolver (fake DB)
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    return users.find((user) => user.id == id);
  },
  createUser: ({ input }) => {
    const user = createUser(input);

    users.push(user);
    return user;
  },
};

app.use("/graphql", createHandler({ schema, rootValue: root }));
app.get("/graphql-pg", expressPlayground.default({ endpoint: "/graphql" })); // playground
// app.use('/graphql', graphqlHttp({
//     graphqlHttp: true,
//     schema
// }));

app.listen(PORT, () =>
  console.log(`🏃‍♀️ Server is running at http://localhost:${PORT}`)
);
