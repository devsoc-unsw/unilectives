module.exports = {
  api: {
    port: 8080,
  },
  database: {
    type: "postgres",
    port: 5432,
    host: "localhost",
    username: "postgres",
    password: "mysecretpassword",
    database: "mydb",
  },
  firebase: {
    authDomain: "",
    projectId: "",
    storageBucket: "",
  },
};
