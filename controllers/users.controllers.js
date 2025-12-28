const { User } = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// postUser
const postUser = async (req, res) => {
  try {
    const {
      username,
      password,
      firstname,
      lastname,
      birthday,
      gander,
      address,
      phone,
      car_id,
      house_id,
      edu_id,
    } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ seccess: false, message: "Bu nom bn foydalanuvchi mavjud" });
    } else {
      const heshedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: heshedPassword,
        firstname,
        lastname,
        birthday,
        gander,
        address,
        phone,
        car_id,
        house_id,
        edu_id,
      });
      await newUser.save();
      res.status(201).json({
        seccess: true,
        message: "Foydalanuvchi muvoffaqiyatli yaratildi",
        user: newUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      seccess: false,
      message: "Serverda xatolik yuz berdi",
      error: error.message,
    });
  }
};

// postLogin
const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Username is invaild",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!password) {
      return res.status(401).json({
        success: false,
        message: "Username or password is invaild",
      });
    }

    const token = jwt.sign({ username: user.username }, "secret");
    res.json({
      message: "Token",
      token: token,
      innerUser: user,
    });
  } catch (error) {
    res.status(500).json({
      seccess: false,
      message: "Serverda xatolik yuz berdi",
      error: error.message,
    });
  }
};

// getUsers
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      success: true,
      message: "Barcha foydalanuvchilar",
      innerData: users,
    });
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({
      success: false,
      message: "Server xatosi",
      error: err.message,
    });
  }
};

// getUserById
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId)
      .populate("car_id", "color model title description")
      .populate("house_id")
      .populate("edu_id");

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.json({ message: "User found", user });
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: "Internal server error" });
  }
};

// updatesUser
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, lastname, phone, address } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, lastname, phone, address },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    res.json({
      success: true,
      message: "User Updated succesful",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internetal server err",
      error: error.message,
    });
  }
};

// deleteUser
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deleteUser) {
      return res.status(404).json({ message: "user not found" });
    }

    res.json({ message: "User Delated succesfuly", deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server eror" });
  }
};

// searchUSer
const searchUSer = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invaild search query." });
    }

    const result = await User.find({
      $or: [
        { firstname: { $regex: query, $options: "i" } },
        { lastname: { $regex: query, $options: "i" } },
        { username: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday foydalanuvchi yuq " });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error: Faild to fetch" });
  }
};

module.exports = {
  postUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUSer,
  postLogin,
};
