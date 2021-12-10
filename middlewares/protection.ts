import url from "url";

const API_KEY_PROTECTED_ROUTES: string[] = [
  "/api/truecaller/auth/",
  "/api/truecaller/auth",
];

const logger = (req: any, res: any, next: any): void => {
  const uri: string = url.parse(req.url).pathname || "/";
  if (API_KEY_PROTECTED_ROUTES.includes(uri)) {
    if (req.query.token !== process.env.API_KEY) {
      return res.json({ message: "Inválid token" });
    }
  }
  next();
};

module.exports = logger;
