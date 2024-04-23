import { useEffect } from "react";

declare global {
  interface Window {
    onloadTurnstileCallback: () => void;
    turnstile: {
      render(
        container: string,
        parameters?: {
          sitekey: string;
          action?: string;
          theme?: string;
          callback?: (token: string) => void;
        }
      ): string;
    };
  }
}

export default function Turnstile({ siteKey }: { siteKey: string }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onloadTurnstileCallback`;
    script.defer = true;
    //script.async = true;
    document.head.appendChild(script);

    window.onloadTurnstileCallback = () => {
      window.turnstile.render("#turnstile-widget", {
        sitekey: siteKey,
        action: "contact",
        theme: "light",
        //callback: function (token: any) {
        //  console.log(`Challenge Success ${token}`);
        //},
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [siteKey]);

  return <div id="turnstile-widget"></div>;
}
