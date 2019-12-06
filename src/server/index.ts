import build from "fastify";

const fastify = build({ logger: true });

fastify.get("/", async () => {
  return {
    message: "hello world"
  };
});

const start = async () => {
  await fastify
    .listen(3000)
    .then(address => {
      console.log(`Server listening on ${address}`);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
};

start();
