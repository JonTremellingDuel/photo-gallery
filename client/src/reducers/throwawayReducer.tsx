const initialState = {
  error: ''
};

const throwawayReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_ERROR':
      return {...state, error: action.payload};
    case 'CLEAR_ERROR':
      return {...state, error: ''};
    default:
      return state;
  }
};

export default throwawayReducer;
  