const { ApolloServer, gql } = require('apollo-server') 

const typeDefs = gql`
scalar Date
    # Pontos de entrada da sua API!
    type Query{
        ola: String
        horaAtual: String
        tipoDate: Date
    }
` 

const resolvers = {
    Query: {
        ola(){
            return "Bom dia!"
        },
        horaAtual(){
            var data = new Date()
            return data.toDateString()
        },
        tipoDate(){
            var data = new Date()
            return data
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(8000).then(({url}) => {
    console.log(`Executando em ${url}`)
})