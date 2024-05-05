import prisma from "~/services/prisma.server";
import bcrypt from "bcryptjs";
import withTryCatch from "~/middlewares/withTryCatch";

const signWithEmail = async (email: string, password: string) => {
  const user = await withTryCatch(
    prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        avatar: true,
      },
    }),
    "Incorrect email or password"
  );

  if (user.error) return { data: null, error: user.error };

  const credential = await withTryCatch(
    prisma.credential.findUnique({
      where: {
        userId: user.data.id,
      },
      select: {
        passwordHash: true,
      },
    }),
    "Incorrect email or password"
  );
  if (credential.error) return { data: null, error: credential.error };

  const match = await bcrypt
    .compare(password, credential.data.passwordHash!)
    .catch((error) => {
      console.error(error);
      return false;
    });

  if (!match)
    return { data: null, error: { message: "Incorrect email or password" } };

  return { data: user.data, error: null };
};

export default signWithEmail;
