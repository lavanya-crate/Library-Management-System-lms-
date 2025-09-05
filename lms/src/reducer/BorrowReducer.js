export const initialState = {
  borrowedBooks: [],
};

export const borrowReducer = (state, action) => {
  switch (action.type) {
    case "BORROW_BOOK":
      if (state.borrowedBooks.find(book => book.book_id === action.payload.book_id)) {
        return state; 
      }
      
      return {
        ...state,
        borrowedBooks: [...state.borrowedBooks, action.payload],
      };

    case "RETURN_BOOK":
      return {
        ...state,
        borrowedBooks: state.borrowedBooks.filter(book => book.book_id !== action.payload),
      };

    default:
      return state;
  }
};
