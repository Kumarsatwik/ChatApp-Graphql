import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation SignupUser($userNew: UserInput!) {
    signupUser(userNew: $userNew) {
      firstName
      lastName
      email
      id
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation Mutation($userSignin: UserSigninInput!) {
    signinUser(userSignin: $userSignin) {
      token
    }
  }
`;

export const SEND_MSG = gql`
  mutation CreateMessage($receiverId: Int!, $text: String) {
    createMessage(receiverId: $receiverId, text: $text) {
      id
      receiverId
      senderId
      text
      createdAt
    }
  }
`;
