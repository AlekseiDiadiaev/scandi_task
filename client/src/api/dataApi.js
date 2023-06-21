const API = 'http://176.114.12.174:10001/';

const _request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
    try {
        const response = await fetch(url, { method, body, headers })
        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status${response.status}`)
        }

        const data = await response.json();

        return data;
    } catch (e) {
        throw e;
    }
}

export const getProducts = () => {
    return _request(API + 'products');
}

export const getOneProduct = (sku) => {
    return _request(API + `products/${sku}`);
}

export const checkUniqueSku = (sku) => {
    return _request(API + `products/isunique/${sku}`);
}

export const deleteProducts = (toDeleteArr) => {
    return toDeleteArr.map((sku) =>{
        return _request(API + `products/${sku}`, 'DELETE');
    });
}



export const createProduct = ({type, body}) => {
    return _request(API + `products/${type}`, 'POST', body, {
        'Content-Type': 'application/json'
      });
}

