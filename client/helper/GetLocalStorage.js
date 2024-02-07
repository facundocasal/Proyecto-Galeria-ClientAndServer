const GetLocalStorage = (key) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
};

export { GetLocalStorage };
