import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useCheckTwitterAuth } from "./hook/useCheckTwitterAuth";
import { Button } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import PostEditor from "./components/PostEditor";
const Popup = () => {
  const twitterAuth = useCheckTwitterAuth();

  if (twitterAuth.isLoading) return <p>Loading...</p>;

  return (
    <div style={{ width: 400, textAlign: "center" }}>
      {twitterAuth.isAuthed ? (
        <>
          <PostEditor />
        </>
      ) : (
        <>
          <p>Twitterアカウントへのログインが必要です</p>
          <Button
            variant="contained"
            startIcon={<TwitterIcon />}
            onClick={() => {
              chrome.runtime.sendMessage({ kind: "authTwitter" }, (res) => {
                twitterAuth.refresh();
              });
            }}
          >
            ログイン
          </Button>
        </>
      )}
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
