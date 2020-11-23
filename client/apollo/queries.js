import { gql } from '@apollo/client';

// AUTH QUERIES STARTS
export const SIGN_UP = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!) {
    signUp(input: { username: $username, email: $email, password: $password }) {
      id
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      id
      username
      role
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

export const GET_CURRENT_USER = gql`
  query Me {
    me {
      id
      username
      role
    }
  }
`;

// AUTH QUERIES END

// PORTFOLIO QUERIES START

export const CREATE_PORTFOLIO = gql`
  mutation CreatePortfolio(
    $title: String
    $company: String
    $companyWebsite: String
    $location: String
    $jobTitle: String
    $description: String
    $startDate: String
    $endDate: String
  ) {
    createPortfolio(
      input: {
        title: $title
        company: $company
        companyWebsite: $companyWebsite
        location: $location
        jobTitle: $jobTitle
        description: $description
        startDate: $startDate
        endDate: $endDate
      }
    ) {
      id
      title
      company
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;

export const GET_PORTFOLIO = gql`
  query GetPortfolio($id: ID!) {
    getPortfolio(id: $id) {
      id
      daysOfExperience @client
      title
      company
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;

export const GET_PORTFOLIOS = gql`
  query GetPortfolios {
    getPortfolios {
      id
      title
      company
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;

export const GET_USER_PORTFOLIOS = gql`
  query GetUserPortfolios {
    getUserPortfolios {
      id
      title
      jobTitle
      startDate
      endDate
    }
  }
`;

export const UPDATE_PORTFOLIO = gql`
  mutation UpdatePortfolio(
    $id: ID
    $title: String
    $company: String
    $companyWebsite: String
    $location: String
    $jobTitle: String
    $description: String
    $startDate: String
    $endDate: String
  ) {
    updatePortfolio(
      id: $id
      input: {
        title: $title
        company: $company
        companyWebsite: $companyWebsite
        location: $location
        jobTitle: $jobTitle
        description: $description
        startDate: $startDate
        endDate: $endDate
      }
    ) {
      _id
      title
      company
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;

export const ALTER_PORTFOLIO = gql`
  mutation AlterPortfolio(
    $id: ID!
    $title: String
    $company: String
    $companyWebsite: String
    $location: String
    $jobTitle: String
    $description: String
    $startDate: String
    $endDate: String
    $action: ACTIONS!
  ) {
    alterPortfolio(
      id: $id
      input: {
        title: $title
        company: $company
        companyWebsite: $companyWebsite
        location: $location
        jobTitle: $jobTitle
        description: $description
        startDate: $startDate
        endDate: $endDate
      }
      action: $action
    ) {
      id
      title
      company
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;

export const DELETE_PORTFOLIO = gql`
  mutation DeletePortfolio($id: ID) {
    deletePortfolio(id: $id)
  }
`;
// PORTFOLIO QUERIES ENDS
