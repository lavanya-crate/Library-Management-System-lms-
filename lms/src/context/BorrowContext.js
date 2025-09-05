import React, { createContext, useReducer, useContext } from "react";
import { borrowReducer, initialState } from "../reducer/BorrowReducer";

const BorrowContext = createContext();

export const BorrowProvider = ({ children }) => {
  const [state, dispatch] = useReducer(borrowReducer, initialState);

  return (
    <BorrowContext.Provider value={{ borrowedBooks: state.borrowedBooks, dispatch }}>
      {children}
    </BorrowContext.Provider>
  );
};

export const useBorrow = () => useContext(BorrowContext);
