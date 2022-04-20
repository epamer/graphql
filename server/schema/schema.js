const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = require("graphql");

const genre = {
  crime: "Crime",
  sciFi: "Sci-Fi",
  sciFiThriller: "Sci-Fi-Thriller",
  crimeComedy: "Crime-Comedy",
};

const moviesDB = [
  {
    id: 0,
    name: "Pulp fiction",
    genre: genre.crime,
    directorId: 0,
  },
  {
    id: 1,
    name: "1984",
    genre: genre.sciFi,
    directorId: 1,
  },
  {
    id: 2,
    name: "v for Vendetta",
    genre: genre.sciFiThriller,
    directorId: 2,
  },
  {
    id: 3,
    name: "Snatch",
    genre: genre.crimeComedy,
    directorId: 0,
  },
  {
    id: 4,
    name: "Reservoir Dogs ",
    genre: genre.crime,
    directorId: 0,
  },
  {
    id: "5",
    name: "The Hateful Eight",
    genre: genre.crime,
    directorId: 1,
  },
  {
    id: "6",
    name: "Inglorious Bastards",
    genre: genre.crime,
    directorId: 2,
  },
];

const directorsDB = [
  {
    id: 0,
    name: "Quentin Tarantino",
    age: 55,
  },
  {
    id: 1,
    name: "Michael Redford",
    age: 72,
  },
  {
    id: 2,
    name: "Guy Ritchie",
    age: 50,
  },
];

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    directorId: { type: GraphQLID },
    director: {
      type: DirectorType,
      resolve(parent) {
        return directorsDB.find(
          (director) => director.id === parent.directorId
        );
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent) {
        return moviesDB.filter((movie) => movie.directorId === parent.id);
      },
    },
  }),
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return moviesDB.find((movie) => movie.id == args.id);
      },
    },
    director: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return directorsDB.find((director) => director.id == args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve() {
        return moviesDB;
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve() {
        return directorsDB;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: Query,
});

module.exports = schema;
