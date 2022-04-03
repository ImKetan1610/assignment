const app = require("./index");
const connect = require("./configs/db")

app.listen("1610", async () => {
  try {
    await connect();
    console.log("listening on port 1610");
  } catch (error) {
    console.error(error.message);
  }
});
