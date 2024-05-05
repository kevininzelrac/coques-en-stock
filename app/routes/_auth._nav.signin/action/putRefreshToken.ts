import prisma from "~/services/prisma.server";

const putRefreshToken = async (userId: string, token: string) => {
  const existingRefreshToken = await prisma.refreshToken
    .findUnique({
      where: {
        userId: userId,
        token: token,
        revoked: false,
      },
      select: {
        token: true,
      },
    })
    .catch((error) => {
      console.error("existingRefreshToken ERROR ", error);
      return null;
    });

  if (existingRefreshToken) {
    return existingRefreshToken.token;
  } else {
    const newRefreshToken = await prisma.refreshToken
      .create({
        data: {
          userId: userId,
          token: token,
          revoked: false,
        },
        select: {
          token: true,
        },
      })
      .catch((error) => {
        console.error("newRefreshToken ERROR ", error);
        return null;
      });
    if (!newRefreshToken) return null;

    return newRefreshToken.token;
  }
};
export default putRefreshToken;
