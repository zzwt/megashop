import User from "../../models/User";
import connectDb from "../../utils/connectDb";
import jwt from "jsonwebtoken";
connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      getUsers(req, res);
      break;
    case "PUT":
      updateRole(req, res);
      break;
    default:
      res.status(500), send(`Unsupported Method: ${req.method}`);
  }
};

const updateRole = async (req, res) => {
  try {
    if (!"authorization" in req.headers) {
      return res.status(400).send("please login");
    }
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    await User.findOneAndUpdate(
      { _id: req.body.userId },
      {
        $set: { role: req.body.role },
      }
    );
    return res.status(200).send("Role updated");
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const getUsers = async (req, res) => {
  try {
    if (!"authorization" in req.headers) {
      return res.status(400).send("please login");
    }
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const users = await User.find({ _id: { $ne: userId } });
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
