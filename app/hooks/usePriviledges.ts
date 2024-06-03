import { Post, User } from "@prisma/client";

const usePriviledges = (user: { id: User["id"]; role: string } | null) => {
  return {
    isAdmin: Boolean(user?.role === "ADMIN"),
    isEditor: Boolean(user?.role === "EDITOR"),
    isGuest: Boolean(user?.role === "GUEST"),
    isFollower: Boolean(user?.role === "FOLLOWER"),
    isAuthor(id: Post["authorId"]) {
      return user?.id === id;
    },
  };
};

export default usePriviledges;
