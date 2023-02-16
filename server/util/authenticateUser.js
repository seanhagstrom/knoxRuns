const { JWT_SECRET } = process.env;

async function authenticateUser({ email, password }) {
  try {
    const user = await getUserByEmail(email);
    console.log(user);
    const match = await bcrypt.compare(password, user.password);

    if (user && match) {
      return {
        token: jwt.sign({ id: user.user_id }, JWT_SECRET),
        message: "You're logged in!",
      };
      // return await generateToken(user);
    } else {
      return {
        name: 'Incorrect Credentials',
        message: 'email or password are incorrect',
      };
    }
  } catch (error) {
    throw error;
  }
}

// async function generateToken({ user_id }) {
//   return {
//     token: jwt.sign({ id: user_id }, JWT_SECRET),
//     message: "You're logged in!",
//   };
// }

module.exports = { authenticateUser };
