import { useState, useEffect } from 'react';

const useFetch = (url, method = 'GET') => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);
  const [isPending, setPending] = useState(false);
  const [myUrl, setUrl] = useState(url);

  const deleteData = (id) => {
    setUrl(url + `/${id}`);
    setOptions({ method: 'DELETE' });
  };

  const postData = (data) => {
    setOptions({
      method: 'POST',
      headers: { 'CONTENT-TYPE': 'application/json' },
      body: JSON.stringify(data),
    });
  };

  useEffect(() => {
    const fetchData = async (fetchOptions) => {
      let res = await fetch(myUrl, { ...fetchOptions });
      res = await res.json();
      setData(res);
    };

    if (method == 'POST' && options) {
      fetchData(options);
    }
    if (method === 'GET') {
      fetchData();
    }

    if (method === 'DELETE' && options) {
      fetchData(options);
    }
  }, [url, options, method]);

  return { data, error, isPending, deleteData, postData };
};

export default useFetch;
