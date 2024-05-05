const template = ({
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
  Source: `no-reply@${process.env.DOMAIN_NAME}`,
  Destination: {
    ToAddresses: [process.env.ADMIN],
  },
  Message: {
    Subject: {
      Charset: "UTF-8",
      Data: `${process.env.FULL_NAME} • Formulaire de Contact`,
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
export default template;
