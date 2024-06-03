import { User } from "@prisma/client";

export default function Badge({
  author,
}: {
  author: {
    firstname: User["firstname"];
    lastname?: User["lastname"];
    avatar?: User["avatar"];
  };
}) {
  return (
    <div style={styles.badge}>
      <img src={author.avatar} style={styles.img} />
      <div style={styles.div}>
        <strong>{author.firstname}</strong>
        {author.lastname && <small>{author.lastname}</small>}
      </div>
    </div>
  );
}

const badge: React.CSSProperties = {
  minWidth: "fit-content",
  height: "fit-content",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "0.2rem",
};

const img: React.CSSProperties = {
  width: "40px",
  height: "auto",
  marginRight: "0.2rem",
};

const div: React.CSSProperties = {
  width: "100%",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
};

const styles = {
  badge,
  img,
  div,
};
