import { gql } from "apollo-server-express";

const userType = gql`
    type User {
        ID: ID!
        firstName: String!
        lastName: String!
        age: Int!
        email: String!
        country: String!
        city: String!
        profession: String!
        salary: Int!
    }

    input UserInput {
        firstName: String!
        lastName: String!
        age: Int!
        email: String!
        country: String!
        city: String!
        profession: String!
        salary: Int!
    }

    type Query {
        getUser(ID: ID!): User
        getUsers: [User]
        getUsersByCountry(country: String!): [User]
        getUsersByCity(city: String!): [User]
        getUsersByProfession(profession: String!): [User]
        getUsersByMinSalary(salary: Int!): [User]
        getUsersByMaxSalary(salary: Int!): [User]
    }

    type Mutation {
        addUser(user: UserInput): User
    }
`

export default userType;
