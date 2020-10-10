const { GraphQLServer } = require('graphql-yoga');

const Users = [
  {
    id:1,
    username:'Behlul',
    city:'Sakarya'
  },
  {
    id:2,
    username:'Yasin',
    city:'İstanbul'
  },
  {
    id:1,
    username:'Caner',
    city:'Sivas'
  }
];

const Posts = [
  {
    id:1,
    text:'Behlul text',
    userId:1
  },
  {
    id:2,
    text:'Yasin text',
    userId:2
  },
  {
    id:1,
    text:'Caner text',
    userId:3
  }
];


const typeDefs = `
  type Query {
    getUser(id: ID!): User!
    getUsers:[User!]!

    getpOST(id:ID!): Post!
    getpOSTs: [Post!]! 

    getUserPosts(id:ID!): Combined!
  }

  type User{
    id: ID!,
    username:String!,
    city:String!
  }
  type Post{
    id: ID!,
    text:String!,
    userId:ID!
  }
  type Combined{
    id: ID!,
    username:String!,
    city:String!,
    posts : Post
  }
 
`;

const resolvers = {
  Query:{
    getUser: (parent, args)=>{
      return Users.find(getUser=>getUser.id == args.id);
    },
    getUsers: (parent, args)=>{
      return Users;
    },
    getpOST: (parent, args)=>{
      return Posts.find(getpOST=>getpOST.id == args.id);
    },
    getpOSTs: (parent, args)=>{
      return Posts;
    },
    getUserPosts: (parent, args)=>{
      return Users.find(getUser=>getUser.id == args.id);
    }
  },
  Combined:{
    posts: (parent, args)=>{
      return Posts.find(getpOST=>getpOST.userId == parent.id);
    },
  }

};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'));
