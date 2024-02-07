const { validationResult } = require("express-validator");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const Artist = require("../models/artist");
const Galleries = require("../models/galleries");
const transporter = require("../util/mailer/mailer");
const mailerNewUser = require("../util/mailer/template/newUser");
require("dotenv").config();

const createUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: "Algo salió mal" });
  }

  try {
    const { email, userName, name, lastName, password } = req.body;

    const newUser = new User({
      email,
      userName,
      name,
      lastName,
      password,
      role: "client",
    });
    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
    newUser.password = bcrypt.hashSync(password, salt);

    await newUser.save();
    await transporter.sendMail({
      from: process.env.USER_MAILER,
      to: email,
      subject: `¡Bienvenidx a Proyecto Galeria `,
      text: `¡Bienvenidx a Proyecto Galeria `,
      html: mailerNewUser(userName),
    });

    return res
      .status(200)
      .json({ message: `User created successfully`, status: 200 });
  } catch (error) {
    console.log(error);
    console.log(errors);
    return res.status(400).json({
      message: "Cannot create user",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "email userName name role");
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Cannot found any user",
    });
  }
};

const getInfoUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const userData = await User.findOne(
      { _id: userId },
      "email role lastName name id userName"
    );
    return res.json(userData);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Cannot found any user",
    });
  }
};

const deleteUser = async (req, res) => {
  const { id, userName, role } = req.body;
  try {
    if (role === "artist") {
      await Artist.findOneAndDelete({ name: userName });
      await User.findOneAndDelete({ _id: id });
      await Galleries.deleteMany({ idArtist: userName });
      return res.status(200).json({
        message: "Artist user deleted succefully!",
      });
    }
    const user = await User.findOneAndDelete({ _id: id });
    if (user) {
      return res.status(200).json({
        message: "User deleted succefully!",
      });
    }
    return res.status(400).json({
      message: "User not found!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Cannot delete user",
      error,
    });
  }
};

const editUser = async (req, res) => {
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: "Algo salió mal" });
  }
  const { email, userName, name, lastName, passOld, password } = req.body;
  const user = await User.findById(req.userId);
  try {
    const match = await bcrypt.compare(passOld, user.password);
    if (match) {
      if (user.role === "artist") {
        if (password) {
          const salt = bcrypt.genSaltSync();
          passwordEncript = bcrypt.hashSync(password, salt);
          await User.findByIdAndUpdate(
            { _id: req.userId },
            {
              password: passwordEncript,
            },
            { new: true }
          );
          return res.status(200).json({ message: "Contraseña Modificada" });
        } else {
          return res.json({
            status: 500,
            message: "Solo puedes modificar tu contraseña ",
          });
        }
      }
      const userMatchName = await User.findOne({ userName });
      if (userMatchName) {
        if (req.userId != userMatchName._id) {
          return res.json({
            message: "nombre de usuario ya se encuentra registrado",
            status: 500,
          });
        }
      }
      const userEmailMatch = await User.findOne({ email: email });
      if (userEmailMatch) {
        if (req.userId != userEmailMatch._id) {
          return res.json({
            message: "email ya se encuentra registrado",
            status: 500,
          });
        }
      }
      if (!password) {
        await User.findByIdAndUpdate(
          { _id: req.userId },
          {
            email: email,
            userName: userName,
            name: name,
            lastName: lastName,
          },
          { new: true }
        );
        return res.status(200).json({ message: "Usuario Modificado" });
      } else {
        const salt = bcrypt.genSaltSync();
        passwordEncript = bcrypt.hashSync(password, salt);
        await User.findByIdAndUpdate(
          { _id: req.userId },
          {
            email: email,
            userName: userName,
            name: name,
            lastName: lastName,
            password: passwordEncript,
          },
          { new: true }
        );
        return res
          .status(200)
          .json({ message: "Usuario Modificado y contraseña" });
      }
    } else {
      return res.json({ message: "Contraseña incorrecta" });
    }
  } catch (error) {
    console.log(errors);
    return res.json(error);
  }
};

module.exports = { createUser, getUsers, deleteUser, getInfoUser, editUser };
