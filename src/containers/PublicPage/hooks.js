import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

const useHooks = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        let headers = {};
        const authToken = (await Auth.currentSession()).getAccessToken().getJwtToken();
        console.log('[PublicPage][loadProducts] authToken: ', authToken);
        if (authToken) {
          headers['Authorization'] = `Bearer ${authToken}`;
        }

        const response = await fetch('https://wmovsdgspc.execute-api.ap-south-1.amazonaws.com/dev/pets', {
          headers,
        });
        const res = await response.json();
        setProducts(res);
      } catch (err) {
        console.log('[PublicPage][loadProducts] err: ', err);
      }
    }

    loadProducts();
  }, [setProducts]);

  return {
    states: {
      products,
    }
  };
}

export default useHooks;
