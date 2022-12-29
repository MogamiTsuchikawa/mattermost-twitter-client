import { useEffect, useState } from "react";
import { storage } from "@extend-chrome/storage";

export const useMattermost = () => {
  const [hookUrl, setHookUrl] = useState<string | undefined>();
  const [posting, setPosting] = useState(false);
  useEffect(() => {
    (async () => {
      const local = await storage.local.get();
      if (local.mattermostHook) {
        setHookUrl(local.mattermostHook);
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
    hookUrl,
    postMattermost,
    posting,
  };
};
