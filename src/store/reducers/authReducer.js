const initialState = {
  isAuthenticated: false,
  token: '',
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
