import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { IResolvers } from '@graphql-tools/utils';
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";



const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs(typeDefs),
    resolvers: mergeResolvers(resolvers as any)
})

export default schema;