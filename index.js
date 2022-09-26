const cron = require("node-cron");
const express = require("express");
const { Curl } = require("node-libcurl");

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => res.send("Hello World!"));

cron.schedule("* * * * *", () => {
  const curl = new Curl();

  curl.setOpt("URL", "esites.eco.br/chats/cron_job/publish_post");
  curl.setOpt("FOLLOWLOCATION", true);

  curl.on("end", function (statusCode, data) {
    console.info(statusCode);
    console.info("---");
    console.info(data.length);
    console.info("---");
    console.info(this.getInfo("TOTAL_TIME"));

    this.close();
  });

  curl.perform();
});

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
