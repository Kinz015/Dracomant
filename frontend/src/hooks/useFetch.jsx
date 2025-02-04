import React from 'react'

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  return { data, loading, error, request }
}

export default useFetch