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
      Data: `${process.env.FULL_NAME} • Account Deletion Confirmation Required`,
    },
    Body: {
      Html: {
        Charset: "UTF-8",
        Data: `
            <main>
              <p>
                Dear ${firstname},
                <br /><br />
                We've received your request to delete your account. 
                <br />
                To proceed with this action, please click the link below within the next 5 minutes:
              </p>
              <a href="${process.env.ORIGIN}/settings/account/delete/${token}">
                Delete Account
              </a>
              <p>
                By clicking this link, your account will be permanently removed from our system.
                <br />
                If you did not initiate this request, please disregard this email.
                <br /><br />
                We want to express our sincere gratitude for your time with us. 
                <br />
                Remember, you'll always be welcome to return.
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
