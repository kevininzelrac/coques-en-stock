const email = ({
  name,
  email,
  object,
  message,
}: {
  name: string;
  email: string;
  object: string;
  message: string;
}) => ({
  Source: "no-reply@coques-en-stock.fr",
  Destination: {
    ToAddresses: [process.env.NO_REPLY!],
  },
  Message: {
    Subject: {
      Charset: "UTF-8",
      Data: "Coques en Stock - Formulaire de contact",
    },
    Body: {
      Html: {
        Charset: "UTF-8",
        Data: `
            <main>
              <div><strong>Name : </strong>${name}</div>
              <div><strong>From : </strong>${email}</div>
              <div><strong>Object : </strong>${object}</div>
              <div><strong>Message : </strong>${message}</div>
            </main>
          `,
      },
    },
  },
});
export default email;
