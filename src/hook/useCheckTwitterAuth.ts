import { useEffect, useState } from "react";

export const useCheckTwitterAuth = () => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const checkAuth = async (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ kind: "checkAuth" }, (res) => {
        return resolve(res === "ok");
      });
    });
  };
  useEffect(() => {
    (async () => {
      const res = await checkAuth();
      setIsAuthed(res);
      setIsLoading(false);
    })();
  }, []);
  const refresh = async (): Promise<boolean> => {
    const res = await checkAuth();
    setIsAuthed(res);
    return res;
  };
  return {
    isAuthed,
    isLoading,
    refresh,
  };
};
