module.exports = {
  api: {
    port: 8080,
  },
  database: {
    type: "postgres",
    port: 5432,
    host: "localhost",
    username: "postgres",
    password: "password",
    database: "mydb",
  },
  firebase: {
    authDomain: "",
    projectId: "",
    storageBucket: "",
  },
  // circles: {
  //   url: "http://localhost:8000",
  // },
};
