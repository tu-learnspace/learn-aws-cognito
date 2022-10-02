import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

const useHooks = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      let headers = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Credentials' : true,
        'Content-Type': 'application/json'
      };
      const authToken = (await Auth.currentSession()).getAccessToken().getJwtToken();
      console.log('[PublicPage][loadProducts] authToken: ', authToken);
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      try {
        const response = await fetch('https://wmovsdgspc.execute-api.ap-south-1.amazonaws.com/dev', {
          headers,
        });
        // const response = await fetch('https://54tcqd60xa.execute-api.us-east-1.amazonaws.com/dev');
        const products = await response.json();
        console.log(products);
        setProducts(products);
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