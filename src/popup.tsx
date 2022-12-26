import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
const API_KEY = "dU9MQXNOd2ZEY2ZyY1dvMGpBNlg6MTpjaQ";
const REDIRECT_URL =
  "https://njiphocbohlfjlgediiblogkjpknelih.chromiumapp.org/callback";
const Popup = () => {
  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();

  useEffect(() => {
    chrome.action.setBadgeText({ text: count.toString() });
  }, [count]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);
  const auth = () => {};

  const changeBackground = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            color: "#555555",
          },
          (msg) => {
            console.log("result message:", msg);
          }
        );
      }
    });
  };

  return (
    <>
      <button
        onClick={() => {
          chrome.runtime.sendMessage({}, (res) => {
            fetch("https://api.twitter.com/2/oauth2/token", {
              method: "POST",
              headers: {
                Authorization: `Basic ZFU5TVFYTk9kMlpFWTJaeVkxZHZNR3BCTmxnNk1UcGphUToyRVNFR3h3T0dXQ09Vdjl4OHNMWTA4UnBTMVNzQUllNXloaEE3UTlsdU9INFlfQUw2Ug==`,
                "Content-type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                code: res!,
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
          });
        }}
      >
        Login
      </button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
