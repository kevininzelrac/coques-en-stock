const Challenge = async (
  token: string
): Promise<
  | {
      success: true;
      "error-codes": string[];
      challenge_ts: string;
      hostname: string;
      action: string;
      cdata: string;
      metadata: { interactive: Boolean };
    }
  | {
      success: false;
      "error-codes": string[];
      messages: string[];
    }
> => {
  return await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: process.env.CLOUDFLARE_SECRET_KEY,
        response: token,
      }),
    }
  )
    .then((res) => res.json())
    .catch((error) => error);
};

export default Challenge;
