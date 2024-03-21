import bcrypt from "bcrypt";

const handPassword = async (password: string): Promise<string> => {
  const result = await bcrypt.hash(password, 10);
  return result;
};

const comparePassword = async (
  password: string,
  passwordHand: string
): Promise<boolean> => {
  const check = await bcrypt.compare(password, passwordHand);
  return check;
};

export default { handPassword, comparePassword };
