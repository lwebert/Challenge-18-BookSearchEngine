export const getSavedBookIds = () => {
    const savedBookIds = localStorage.getItem('saved_books')
      ? JSON.parse(localStorage.getItem('saved_books')!)
      : [];
  
    return savedBookIds;
  };
  
  export const saveBookIds = (bookIdArr: string[]) => {
    if (bookIdArr.length) {
      localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
    } else {
      localStorage.removeItem('saved_books');
    }
  };
  
  export const removeBookId = (bookId: string) => {
    const savedBookIds = localStorage.getItem('saved_books')
      ? JSON.parse(localStorage.getItem('saved_books')!)
      : null;
  
    if (!savedBookIds) {
      return false;
    }
  
    const updatedSavedBookIds = savedBookIds?.filter((savedBookId: string) => savedBookId !== bookId);
    localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));
  
    return true;
  };