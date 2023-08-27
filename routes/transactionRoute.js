const authMiddleware = require("../middlewares/authMiddleware");
const Transaction = require("../models/transactionModel");
const User = require("../models/usersModel");

const router = require("express").Router();

// transfer funds
router.post("/transfer-funds", authMiddleware, async (req, res) => {
  try {
    // save transaction
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();

    //decrease sender's balance
    await User.findByIdAndUpdate(req.body.sender, {
      $inc: { balance: -req.body.amount },
    });

    // increase receiver's balance
    await User.findByIdAndUpdate(req.body.receiver, {
      $inc: { balance: req.body.amount },
    });

    res.send({
      message: "Transaction Successfull",
      success: true,
      data: newTransaction,
    });
  } catch (error) {
    res.send({
      message: "Transaction Failed",
      success: false,
      data: error.message,
    });
  }
});

// verify account number

router.post("/verify-account-number", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.receiver });

    if (user) {
      res.send({
        mesage: "Account verified",
        success: true,
        data: user,
      });
    } else {
      res.send({
        message: "Account not found",
        success: false,
        data: null,
      });
    }
  } catch (error) {
    res.send({
      message: "Account not found",
      success: false,
      data: error.message,
    });
  }
});

router.get("/get-all-user-transactions", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
    });
    res.send({
      message: "transactions fetched successfully",
      success: true,
      data: transactions,
    });
  } catch (error) {
    res.send({
      message: "failed to fetch transactions",
      success: false,
      data: error.message,
    });
  }
});

module.exports = router;
