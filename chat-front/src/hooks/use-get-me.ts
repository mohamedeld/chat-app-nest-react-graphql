import { User } from "@/models/User";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_ME = gql`
  query Me {
    me {
      _id
      email
    }
  }
`;

export const useGetMe = () => {
  return useQuery<{ me: User }>(GET_ME);
};
