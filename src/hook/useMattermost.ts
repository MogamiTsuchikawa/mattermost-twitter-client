import { useEffect, useState } from "react";
import { storage } from "@extend-chrome/storage";

export const useMattermost = () => {
  const [token, setToken] = useState<string | undefined>();
  const [posting, setPosting] = useState(false);
  useEffect(() => {
    (async () => {
      const local = await storage.local.get();
      if (local.mattermostToken) {
        setToken(local.mattermostToken);
      }
    })();
  }, []);
  const postMattermost = async (text: string): Promise<void> => {
    setPosting(true);
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(
        { kind: "postMattermost", text: text },
        (res) => {
          console.log(res);
          if (res === "done") {
            resolve();
            setPosting(false);
          } else reject();
        }
      );
    });
  };
  return {
    token,
    postMattermost,
    posting,
  };
};
