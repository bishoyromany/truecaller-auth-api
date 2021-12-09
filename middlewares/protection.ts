const logger = (req: any, res: any, next: any): void => {
  if (req.query.token !== process.env.API_KEY) {
    return res.json({ message: "Token inválid" });
  }
  next();
};

module.exports = logger;
