import app from "../src/app";
import initDB from "../src/config/db";

let dbInitialized = false;

const handler = async (req: any, res: any) => {
  if (!dbInitialized) {
    try {
      await initDB();
      dbInitialized = true;
    } catch (error) {
      console.log("db initialized failed", error);
    }
  }
  return app(req, res);
};

export default handler;
