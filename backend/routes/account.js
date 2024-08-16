const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });

  res.status(200).json({
    balance: account.balance,
  });
});

//Bad solution

// router.post("/transfer", authMiddleware, async (req, res) => {
//   const { to, amount } = req.body;

//   const account = await Account.findOne({
//     userId: req.userId,
//   });

//   if (account.balance < amount) {
//     return res.status(400).json({
//       message: "Insufficient balance",
//     });
//   }

//   const toAccount = await Account.findOne({
//     userId: to,
//   });

//   if (!toAccount) {
//     return res.status(400).json({
//       message: "Invalid account",
//     });
//   }

//   await Account.updateOne(
//     {
//       userId: req.userId,
//     },
//     {
//       $inc: {
//         balance: -amount,
//       },
//     }
//   );

//   await Account.updateOne(
//     {
//       userId: to,
//     },
//     {
//       $inc: {
//         balance: amount,
//       },
//     }
//   );

//   res.status(200).json({
//     message: "Transfer successful",
//   });
// });

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction(); //starting the session

  const { amount, to } = req.body;

  const account = await Account.findOne({ userId: req.userId }).session(
    session
  ); //whenever we call the module(db) we need to specify session

  if (account.balance < amount) {
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);

  await Account.updateOne(
    { userId: to },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);

  await session.commitTransaction(); //commiting the session (until this the change won't reflect on db)

  res.status(200).json({
    message: "Transfer sucessful",
  });
});

module.exports = router;
