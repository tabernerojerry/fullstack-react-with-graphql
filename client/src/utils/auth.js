const accesskeyToken = "recipeToken";

export default {
  setItemToken: token => localStorage.setItem(accesskeyToken, token),
  getAccessToken: () => localStorage.getItem(accesskeyToken),
  isLoggedIn: () => !!localStorage.getItem(accesskeyToken),
  logOut: () => localStorage.removeItem(accesskeyToken)
};
