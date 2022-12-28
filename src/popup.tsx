import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
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
  const [text, setText] = useState("");

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
          chrome.runtime.sendMessage({ kind: "authTwitter" }, (res) => {});
        }}
      >
        Login
      </button>
      <input
        type="text"
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button
        onClick={() => {
          chrome.runtime.sendMessage(
            { kind: "postTwitter", text: text },
            (res) => {}
          );
        }}
      >
        PostTweet
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
