const mongoose = require("mongoose");

module.exports = {
  connect: (DB_URL: string) => {
    mongoose.connect(DB_URL);
    //Log an error if we fail to connect
    mongoose.connection.on("error", (err: any) => {
      console.error(err);
      console.log("MongoDB connection failed: " + DB_URL);
      process.exit();
    });

    // log success login
    mongoose.connection.once("open", () =>
      console.log("MongoDB Connection Success.")
    );
  },

  //close the connection
  close: () => {
    mongoose.connection.close();
  },
};
