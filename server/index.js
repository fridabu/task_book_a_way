/* We split he server out into a different file so that our tests don't hang
because the server is listening still */
const app = require("./server.js");
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`The things, the things are happening on ${port}!!`);
});
