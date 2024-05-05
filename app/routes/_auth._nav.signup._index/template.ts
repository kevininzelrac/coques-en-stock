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
      Data: `${process.env.FULL_NAME} • Sign Up`,
    },
    Body: {
      Html: {
        Charset: "UTF-8",
        Data: `
            <main>
              <p>
                Hi ${firstname},
                <br /><br />
                We're thrilled to have you join our community.
                <br />
                To complete your registration and officially become a member of our crew, please click the link below within the next 5 minutes:
              </p>
              <a href="${process.env.ORIGIN}/signup/${token}">
                Sign Up
              </a>
              <p>
                As a Follower, you'll receive our newsletter to stay updated on the latest news and events. 
                <br />
                Additionally, you'll have access to the public sections of our website, where you can explore our content and engage with us.
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
