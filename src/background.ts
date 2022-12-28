import { storage } from "@extend-chrome/storage";

const API_KEY = "dU9MQXNOd2ZEY2ZyY1dvMGpBNlg6MTpjaQ";
const REDIRECT_URL =
  "https://njiphocbohlfjlgediiblogkjpknelih.chromiumapp.org/callback";

const authTwitter = (sendResponse: (response?: any) => void) => {
  chrome.identity.launchWebAuthFlow(
    {
      url: `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${API_KEY}&redirect_uri=${REDIRECT_URL}&scope=tweet.read%20tweet.write%20users.read&state=abc&code_challenge=abcd&code_challenge_method=plain`,
      interactive: true,
    },
    (res) => {
      console.log(res);
      const code = res?.split("&code=")[1];
      console.log(code);
      fetch("https://api.twitter.com/2/oauth2/token", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          Authorization: `Basic ZFU5TVFYTk9kMlpFWTJaeVkxZHZNR3BCTmxnNk1UcGphUToyRVNFR3h3T0dXQ09Vdjl4OHNMWTA4UnBTMVNzQUllNXloaEE3UTlsdU9INFlfQUw2Ug==`,
          "Content-type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code: code!,
          grant_type: "authorization_code",
          client_id: API_KEY,
          redirect_uri: REDIRECT_URL,
          code_verifier: "abcd",
        }),
      })
        .then((res) => {
          res.json().then((jsonStr) => {
            console.log(jsonStr);

            storage.local.set({ twitterToken: jsonStr.access_token });
            sendResponse("done");
          });
        })
        .catch((e) => {
          console.log(e);
          sendResponse("fail");
        });
    }
  );
};

const postTwitter = (text: string, sendResponse: (response?: any) => void) => {
  (async () => {
    const token = await storage.local.get("twitterToken");
    console.log(token);
    try {
      const res = await fetch("https://api.twitter.com/2/tweets", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token.twitterToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      });
      console.log(await res.json());
      sendResponse("done");
    } catch (e: any) {
      sendResponse("fail");
    }
  })();
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.kind) {
    case "authTwitter":
      authTwitter(sendResponse);
      break;
    case "postTwitter":
      postTwitter(message.text, sendResponse);
      break;
  }
  return true;
});
