const moment = require("moment");

const User = require("../models/users");
const {
  firstLetterCapital,
  checkBody,
  checkEmail,
} = require("../utils/string");

const userSignup = async (firstName, lastName, email, password) => {
  const inputChecks = ["email", "password"];

  if (checkBody({ email, password }, inputChecks) && checkEmail(email)) {
    // recherche si existant dans la bdd
    const existingUser = await User.findOne({
      email: { $regex: new RegExp(email, "i") },
    });

    if (existingUser === null) {
      //si je ne trouve pas l'email dans la bdd, alors je poursuis et crée un nouvel utilisateur
      const newUser = await createUser(firstName, lastName, email, password);

      return newUser;
    }
  }
};

const createUser = async (firstName, lastName, email, password) => {
  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
  });

  return await newUser.save();
};

const userSignin = async (email, password) => {
  //appel à check email
  //appel à checkbody
  const user = await User.findOne({
    email: { $regex: new RegExp(email, "i") },
    password,
  });
  if (user !== null) {
    return user
  } 
};

module.exports = { createUser, userSignup, userSignin };
