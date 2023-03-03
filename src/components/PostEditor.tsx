import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTweetTwitter } from "../hook/useTweetTwitter";
import CheckIcon from "@mui/icons-material/Check";
import { useMattermost } from "../hook/useMattermost";

const PostEditor = () => {
  const [text, setText] = useState("");
  const twitter = useTweetTwitter();
  const [postDone, setPostDone] = useState(false);
  const [isSyncPostMode, setIsSysncPostMode] = useState(true);
  const mattermost = useMattermost();
  const onClickPost = () => {
    (async () => {
      try {
        await mattermost.postMattermost(text);
        if (isSyncPostMode) await twitter.postTweet(text);
        setText("");
        setPostDone(true);
      } catch (e) {
        console.log(e);
      }
    })();
  };
  return (
    <>
      <TextField
        label="投稿内容"
        variant="outlined"
        onChange={(e) => {
          setText(e.target.value);
          setPostDone(false);
        }}
        style={{ width: "100%" }}
        multiline
        rows={4}
        value={text}
      />
      {mattermost.token ? (
        <input
          type="checkbox"
          name="Twitter同時投稿"
          checked={isSyncPostMode}
          onChange={(e) => {
            setIsSysncPostMode(e.target.checked);
          }}
        />
      ) : (
        <></>
      )}

      <LoadingButton
        loading={twitter.posting || mattermost.posting}
        disabled={twitter.posting || mattermost.posting}
        onClick={onClickPost}
        variant="contained"
        endIcon={postDone ? <CheckIcon /> : null}
      >
        投稿
      </LoadingButton>
    </>
  );
};
export default PostEditor;
