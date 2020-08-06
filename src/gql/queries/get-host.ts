import gql from "graphql-tag";

export const GET_HOST = gql`
  query Host($id: String!) {
    host(hostId: $id) {
      id
      hostUrl
      distroId
      provider
      startedBy
      user
      status
      runningTask {
        id
        name
      }
      lastCommunicationTime
    }
  }
`;
