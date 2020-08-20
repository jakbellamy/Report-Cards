/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SILENT_LOGIN,
  UPDATE_PROFILE
} from 'src/utilities/actions/accountActions';

const initialState = {
  user: null,
  error: null
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return produce(state, (draft) => {
        // Ensure we clear current session
        draft.user = null;
      });
    }

    case LOGIN_SUCCESS: {
      const { user } = action.payload;

      return produce(state, (draft) => {
        draft.user = user;
      });
    }

    case LOGIN_FAILURE: {
      const { error } = action.payload
      return produce(state, (draft) => {
        draft.error = error
      });
    }

    case LOGOUT: {
      return produce(state, (draft) => {
        draft.user = null;
      });
    }

    case SILENT_LOGIN: {
      const { user } = action.payload;

      return produce(state, (draft) => {
        draft.user = user;
      });
    }

    case UPDATE_PROFILE: {
      const { user } = action.payload;

      return produce(state, (draft) => {
        draft.user = user;
      });
    }

    default: {
      return state;
    }
  }
};

export default accountReducer;
