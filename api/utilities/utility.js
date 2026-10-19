import dotenv from "dotenv";

// Create a method to salt round
const getSaltRounds = () => {
  // configure dotenv
  dotenv.config();

  return parseInt(process.env.SECRETSALT);
};

export { getSaltRounds };
