export const storeToken = (token: string) => ({ 
    type: 'STORE_TOKEN',
    payload: token
});
export const clearToken = () => ({ type: 'CLEAR_TOKEN' });
export const setError = (error: string) => ({ 
    type: 'SET_ERROR',
    payload: error
});
export const clearError = () => ({ type: 'CLEAR_ERROR' });