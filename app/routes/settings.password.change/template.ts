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
      Data: `${process.env.FULL_NAME} • Change Password`,
    },
    Body: {
      Html: {
        Charset: "UTF-8",
        Data: `
            <main>
              <p>
                Dear ${firstname},
                <br /><br />
                We've received a request to change your password.
                <br />
                To complete this process, please click the link below within the next 5 minutes:
              </p>
              <a href="${process.env.ORIGIN}/settings/password/change/${token}">
                Reset Password
              </a>
              <p>
                If you did not make this request, you can safely ignore this email.
                <br /><br />
                Best regards,
                <br />
                ${process.env.FULL_NAME}
            </main>
          `,
      },
    },
  },
});

export default template;
