function polling() {
  // console.log("polling");
  setTimeout(polling, 1000 * 30);
}

polling();

const API_KEY = "dU9MQXNOd2ZEY2ZyY1dvMGpBNlg6MTpjaQ";
const REDIRECT_URL =
  "https://njiphocbohlfjlgediiblogkjpknelih.chromiumapp.org/callback";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
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
          console.log(res);
          try {
          } catch (e) {
            console.log(e);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  );
  sendResponse("");
  return true;
});
