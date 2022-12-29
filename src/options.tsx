import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { storage } from "@extend-chrome/storage";

const Options = () => {
  const [mattermostToken, setMattermostToken] = useState("");
  const [mattermostDomain, setMattermostDomain] = useState("");
  const [mattermostChannel, setMattermostChannel] = useState("");
  useEffect(() => {
    (async () => {
      const local = await storage.local.get();
      if (local.mattermostToken) {
        setMattermostToken(local.mattermostToken);
        setMattermostDomain(local.mattermostDomain);
        setMattermostChannel(local.mattermostChannel);
      }
    })();
  }, []);
  const onClick = () => {
    (async () => {
      const local = storage.local.get();
      storage.local.set({
        ...local,
        mattermostToken,
        mattermostDomain,
        mattermostChannel,
      });
    })();
  };
  return (
    <>
      <p>対象Mattermostドメイン</p>
      <input
        type="text"
        value={mattermostDomain}
        onChange={(e) => {
          setMattermostDomain(e.target.value);
        }}
      />
      <p>Mattermost対象チャンネルID（チャンネル名・URLとの混同注意）</p>
      <input
        type="text"
        value={mattermostChannel}
        onChange={(e) => {
          setMattermostChannel(e.target.value);
        }}
      />
      <p>MattermostPersonalAccessToken</p>
      <input
        type="text"
        value={mattermostToken}
        onChange={(e) => {
          setMattermostToken(e.target.value);
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
