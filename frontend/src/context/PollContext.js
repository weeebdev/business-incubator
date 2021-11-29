import React from "react";

var PollStateContext = React.createContext();
var PollDispatchContext = React.createContext();

function pollReducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, data: action.data };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function PollProvider({ children }) {
  var [state, dispatch] = React.useReducer(pollReducer, {
    data: null,
    errors: null,
  });

  return (
    <PollStateContext.Provider value={state}>
      <PollDispatchContext.Provider value={dispatch}>
        {children}
      </PollDispatchContext.Provider>
    </PollStateContext.Provider>
  );
}

function usePollState() {
  var context = React.useContext(PollStateContext);
  if (context === undefined) {
    throw new Error("usePollState must be used within a PollProvider");
  }
  return context;
}

function usePollDispatch() {
  var context = React.useContext(PollDispatchContext);
  if (context === undefined) {
    throw new Error("usePollDispatch must be used within a PollProvider");
  }
  return context;
}

export { PollProvider, usePollState, usePollDispatch, setData, setErrors };

// ###########################################################

function setData(dispatch, data) {
  dispatch({ type: "SET_DATA", data });
}

function setErrors(dispatch, errors) {
  dispatch({ type: "SET_ERRORS", errors });
}
