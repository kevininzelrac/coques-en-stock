import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    fbAsyncInit: any;
    FB: any;
    handleFB: () => void;
  }
}

export default function FacebookSign({ client_id }: { client_id: string }) {
  const fetcher = useFetcher();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://connect.facebook.net/fr_FR/sdk.js`;
    script.crossOrigin = "anonymous";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    const handleLoading = () => setLoading(false);
    script.addEventListener("load", handleLoading);

    window.fbAsyncInit = () => {
      window.FB.init({
        appId: client_id,
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });
    };
    window.FB?.XFBML.parse();

    window.handleFB = () => {
      window.FB.getLoginStatus((response: any) => {
        if (response.status === "connected") {
          fetcher.submit(
            {
              type: "facebook",
              accessToken: response.authResponse.accessToken,
            },
            { method: "post" }
          );
        }
      });
    };
    return () => {
      script.removeEventListener("load", handleLoading);
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      {loading && <i>Loading...</i>}
      {fetcher.state === "idle" ? (
        <div
          className="fb-login-button"
          data-size="large"
          data-button-type="login_with"
          data-auto-logout-link="false"
          data-use-continue-as="true"
          data-width="300"
          data-scope="public_profile,email"
          data-onlogin="handleFB"
        ></div>
      ) : (
        <i>{fetcher.state}</i>
      )}
    </>
  );
}

/* 
2 ways to load fb sdk in remix

I:
script.src = `https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v19.0&appId=${client_id}&autoLogAppEvents=1`;
    script.crossOrigin = "anonymous";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

II :
script.src = `https://connect.facebook.net/en_US/sdk.js`;
    script.crossOrigin = "anonymous";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    window.fbAsyncInit = () => {
      window.FB.init({
        appId: client_id,
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });
    };
*/
