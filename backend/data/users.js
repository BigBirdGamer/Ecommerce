const bcrypt = require("bcrypt");

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: true,
  },
  {
    name: "Lucas Lee",
    email: "lucas@example.com",
    password: bcrypt.hashSync("1234", 10),
  },
  {
    name: "Lucy Lee",
    email: "lucy@example.com",
    password: bcrypt.hashSync("1234", 10),
  },
];
