const initialState = {
    token: parseInt(localStorage.getItem('token')) || '',
  };
  
  const counterReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'STORE_TOKEN':
        localStorage.setItem('token', action.payload);
        return {...state, token: action.payload};
      case 'CLEAR_TOKEN':
        localStorage.removeItem('token');
        return {...state, token: ''};
      default:
        return state;
    }
  };
  
  export default counterReducer;
  