import { useCallback, useState } from "react";

const useHttp = () => {
  const [error, setError] = useState("");

  const sendHttpRequest = useCallback(async (reqOptions, manageData) => {
    try {
      const res = await fetch(reqOptions.endpoint, {
        method: reqOptions?.method?.toUpperCase() || "GET",
        body: JSON.stringify(reqOptions?.body) || null,
        headers: reqOptions?.headers || {},
      });

      // if(!res.ok)
      //    throw Error('Что то пошло не так')

      const data = await res.json();

      console.log(data);

      manageData(data);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  return {
    hasError: error,
    sendHttpRequest,
  };
};

export default useHttp;
