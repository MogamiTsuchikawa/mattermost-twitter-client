import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { storage } from "@extend-chrome/storage";

const Options = () => {
  const [mattermostWebhook, setMattermostWebhook] = useState("");
  const [mattermostUsername, setMattermostUsername] = useState("");
  useEffect(() => {
    (async () => {
      const local = await storage.local.get();
      if (local.mattermostHook && local.mattermostUsername) {
        setMattermostUsername(local.mattermostUsername);
        setMattermostWebhook(local.mattermostHook);
      }
    })();
  }, []);
  const onClick = () => {
    (async () => {
      const local = storage.local.get();
      storage.local.set({
        ...local,
        mattermostHook: mattermostWebhook,
        mattermostUsername: mattermostUsername,
      });
    })();
  };
  return (
    <>
      <p>WebhoolURL</p>
      <input
        type="text"
        value={mattermostWebhook}
        onChange={(e) => {
          setMattermostWebhook(e.target.value);
        }}
      />
      <p>投稿者名</p>
      <input
        type="text"
        value={mattermostUsername}
        onChange={(e) => {
          setMattermostUsername(e.target.value);
        }}
      />
      <button onClick={onClick}>更新</button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
