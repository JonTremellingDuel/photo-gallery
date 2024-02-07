export const storeToken = (token) => ({ 
    type: 'STORE_TOKEN',
    payload: token
});
export const clearToken = () => ({ type: 'CLEAR_TOKEN' });