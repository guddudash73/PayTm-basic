const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const router = express.Router();

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Email already taken/ Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({ username: req.body.username });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken/ incorrect inputs",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  var token = jwt.sign({ userId }, JWT_SECRET);

  res.status(200).json({
    message: "User created sucessfully",
    token: token,
  });
});

// const userNameSchema = zod.string().email({ message: "Invalid Email id" });

// router.post("/signup", async (req, res) => {
//   const userName = req.body.username;
//   const password = req.body.password;
//   const firstName = req.body.firstName;
//   const lastName = req.body.lastName;

//   const username = userNameSchema.parse(userName);

//   const existingUser = await User.findOne({ username: username });

//   if (existingUser) {
//     return res.status(411).json({
//       error: "User already Exists",
//     });
//   }

//   const user = await User.create({
//     username: username,
//     password: password,
//     firstName: firstName,
//     lastName: lastName,
//   });

//   user.save();

//   var token = jwt.sign({ username: username }, JWT_SECRET);

//   res.status(200).json({
//     msg: "User created sucessfully",
//     token: token,
//   });
// });

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (!user) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }

  const userId = user._id;
  const token = jwt.sign({ userId }, JWT_SECRET);
  const firstName = user.firstName;

  res.status(200).json({
    token: token,
    firstName: firstName,
  });
});

//update user

const updateUser = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateUser.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne(
    { _id: req.userId },
    {
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }
  );

  res.status(200).json({
    message: "Updated successfully",
  });
});

//filter

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter;
  const users = await User.find({
    $or: [
      { firstName: { $regex: filter, $options: "i" } }, //added options to find user with case insensitivity to match upper and lower case
      { lastName: { $regex: filter, $options: "i" } },
    ],
  });

  res.status(200).json({
    users: users.map((user) => {
      return {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      };
    }),
  });
});

module.exports = router;
