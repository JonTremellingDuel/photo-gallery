const initialState = {
  error: ''
};

const throwawayReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      console.log(action.payload)
      localStorage.setItem('error', action.payload);
      return {...state, error: action.payload};
    case 'CLEAR_ERROR':
      localStorage.removeItem('error');
      return {...state, error: ''};
    default:
      return state;
  }
};

export default throwawayReducer;
  