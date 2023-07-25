import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';

import models from './models'

import resolvers from './graphql/resolvers'
import typeDefs from './graphql/types'


const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const apolloServer = new ApolloServer({
    schema,
    context:{
        models
    }
});

const alter=true
const force=false

models.sequelize.sync({alter,force}).then(()=>{
    apolloServer.listen(5000).then(({ url }) => console.log(`Corriendo en ${url}`));
})


