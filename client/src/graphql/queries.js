import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query Users {
    users {
      email
      firstName
      id
      lastName
    }
  }
`;

export const GET_ALL_MESSAGES = gql`
  query MessagesByUser($receiverId: Int) {
    messagesByUser(receiverId: $receiverId) {
      id
      receiverId
      senderId
      text
      createdAt
    }
  }
`;
