import prisma from "~/services/prisma.server";

const signWithGoogle = async (accessToken: string) => {
  const response = await fetch(
    "https://graph.facebook.com/v19.0/me?fields=id,name,email,picture.height(200)",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) throw new Error("Error from Facebook API");

  const { id, name, email, picture } = await response.json();

  const user = await prisma.user
    .upsert({
      where: { email: email },
      update: { avatar: picture.data.url },
      create: {
        email: email,
        fullname: name,
        firstname: name.split(" ")[0],
        lastname: name.split(" ")[1],
        avatar: picture.data.url,
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
