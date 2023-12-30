import bcrypt from "bcrypt";

export const generateHashedPassword = async (password) => {
  const salt = bcrypt.genSaltSync(10);
  return await bcrypt.hash(password, salt);
};
