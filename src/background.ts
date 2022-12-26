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
      sendResponse(code);
    }
  );
  return true;
});
