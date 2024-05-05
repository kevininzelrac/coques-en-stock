import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    handleCreds: (response: any) => void;
  }
}

export default function GoogleSign({ client_id }: { client_id: string }) {
  const fetcher = useFetcher();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    const handleLoading = () => setLoading(false);
    script.addEventListener("load", handleLoading);

    window.handleCreds = ({ credential }: any) => {
      fetcher.submit(
        {
          type: "google",
          accessToken: credential,
        },
        { method: "post" }
      );
    };
    return () => {
      script.removeEventListener("load", handleLoading);
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      {loading && <i>Loading...</i>}
      <div
        id="g_id_onload"
        data-client_id={client_id}
        data-callback="handleCreds"
        data-auto_prompt="false"
      ></div>
      {fetcher.state === "idle" ? (
        <div
          className="g_id_signin"
          data-height="auto"
          data-type="standard"
          data-size="large"
          data-width="300"
          data-theme="outline"
          data-text="sign_in_with"
          data-shape="rectangular"
          data-logo_alignment="left"
        ></div>
      ) : (
        <i>{fetcher.state}</i>
      )}
    </>
  );
}
