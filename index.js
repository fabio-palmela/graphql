const { ApolloServer, gql } = require('apollo-server') 

const typeDefs = gql`
    scalar Date

    type Usuario {
        id: ID
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    type Produto {
        id: ID
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    # Pontos de entrada da sua API!
    type Query{
        ola: String!
        horaAtual: Date!
        tipoDate: Date!
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
    }
` 

const resolvers = {
    Usuario: {
        salario(usuario){
            return usuario.salario_real
        }
    },
    Produto: {
        precoComDesconto(produto){
            var precoDesconto = produto.preco - produto.desconto
            precoDesconto = parseFloat(precoDesconto.toFixed(2))
            return precoDesconto
        }
    },
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
        },
        usuarioLogado(){
            return {
                id: 1,
                nome: 'Ana',
                email: 'a@email.com.br',
                idade: 3,
                salario_real: 123.44,
                vip: true
            }
        },
        produtoEmDestaque(){
            return {
                id: 1,
                nome: 'Geladeira',
                preco: 54.34,
                desconto: 2.33
            }
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