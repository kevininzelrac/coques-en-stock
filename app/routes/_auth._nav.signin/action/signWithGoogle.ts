import prisma from "~/services/prisma.server";

const signWithGoogle = async (accessToken: string) => {
  const response = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${accessToken}`,
    { method: "GET" }
  );

  if (!response.ok)
    return { data: null, error: { message: "Error from Google API" } };

  const { sub, email, given_name, family_name, picture } =
    await response.json();

  const user = await prisma.user
    .upsert({
      where: { email: email },
      update: { avatar: picture },
      create: {
        email: email,
        fullname: given_name + " " + family_name,
        firstname: given_name,
        lastname: family_name,
        avatar: picture,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        avatar: true,
      },
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
  if (!user) return { data: null, error: { message: "User not found" } };

  return { data: user, error: null };
};
export default signWithGoogle;
