import { useState } from "react";

export const useTweetTwitter = () => {
  const [posting, setPosting] = useState(false);
  const postTweet = async (text: string): Promise<void> => {
    setPosting(true);
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ kind: "postTwitter", text: text }, (res) => {
        if (res === "done") {
          resolve();
          setPosting(false);
        } else reject();
      });
    });
  };
  return {
    postTweet,
    posting,
  };
};
