import {createServer} from "node:http";
import "dotenv/config";
import {createApplication} from "./app";


async function main() {
  try {
    const server = createServer(createApplication());
    const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;

    server.listen(PORT, () => {
      console.log(
        "Server is running on PORT ",
        PORT,
        `in ${process.env.NODE_ENV}`,
      );
    });
  } catch (error) {
    console.log(error);
  }
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
