const template = ({
  email,
  firstname,
  token,
}: {
  email: string;
  firstname: string;
  token: string;
}) => ({
  Source: `${process.env.FULL_NAME} <no-reply@${process.env.DOMAIN_NAME}>`,
  Destination: {
    ToAddresses: [email],
  },
  Message: {
    Subject: {
      Charset: "UTF-8",
      Data: `${process.env.FULL_NAME} • Forgot Password`,
    },
    Body: {
      Html: {
        Charset: "UTF-8",
        Data: `
            <main>
              <p>
                Hi ${firstname},
                <br /><br />
                You recently requested to reset your password. 
                <br />
                To proceed, please click the link below within the next 5 minutes:
              </p>
              <a href="${process.env.ORIGIN}/password/forgot/${token}">
              Forgot Password
              </a>
              <p>
                If you did not initiate this request, you can safely ignore this email.
                <br /><br />
                Best regards,
                <br />
                ${process.env.FULL_NAME} 
              </p>
            </main>
            `,
      },
    },
  },
});

export default template;
