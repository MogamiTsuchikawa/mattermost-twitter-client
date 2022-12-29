import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { storage } from "@extend-chrome/storage";

const Options = () => {
  const [mattermostToken, setMattermostToken] = useState("");
  const [mattermostDomain, setMattermostDomain] = useState("");
  useEffect(() => {
    (async () => {
      const local = await storage.local.get();
      if (local.mattermostToken) {
        setMattermostToken(local.mattermostToken);
        setMattermostDomain(local.mattermostDomain);
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
