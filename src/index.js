import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
    type Query {
        hello: String!
    }
    
    type User {
        id: ID!
        username: String!
    }

    type Error {
        field: String!
        message: String!
    }

    type RegisterResponse {
        user: User!
        errors: [Error]!
    }

    input UserInfo {
        username: String!
        password: String!
        age: Int!
    }

    type Mutation {
        register(userInfo: UserInfo!): RegisterResponse!
        login(userInfo: UserInfo): Boolean!
    }
`;
//resolvers takes in 4 parameters: parent, args, context, info
//arguments can also be added as part of mutation object keys
const resolvers ={
    Query: {
        hello: () => "hello world!"
    },
    Mutation: {
        login: (parent, {userInfo: {UserInfo}}, context, info) => {
            return true
        },
        register: () => ({
            user: {
            id: 1,
            username: "bob"
            },
            errors: [{
                field: "username",
                message: "reg error"
            },
            {
                field: "password",
                message: "pass err"
            }
            ]
        })
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res })
});

server.listen()
    .then(({ url }) => console.log(`server started at ${url}`));
