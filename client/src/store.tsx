import { createStore } from 'redux';
import rootReducer from './reducers';

export interface stateSchema { persisted?: { token: any; }; throwaway?: { error: any; }; };

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return {
      persisted: JSON.parse(serializedState)
    }
  } catch (err) {
    return undefined;
  }
};

const saveState = (state: stateSchema) => {
  try {
    const serializedState = JSON.stringify(state.persisted);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState
);

store.subscribe(() => {
  saveState({
    persisted: store.getState().persisted
  });
});

export default store;
