import gql from "graphql-tag";

export default {
  SIGNUP_USER: gql`
    mutation SignUp($input: SignUpInput!) {
      signUp(input: $input) {
        token
      }
    }
  `,
  SIGNIN_USER: gql`
    mutation SignIn($input: SignInInput!) {
      signIn(input: $input) {
        token
      }
    }
  `
};
