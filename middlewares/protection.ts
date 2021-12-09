const logger = (req: any, res: any, next: any): void => {
  console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
  next();
};

module.exports = logger;
