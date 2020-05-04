module.exports = {
  type: "mongodb",
  host: process.env.AYA_DB_HOST || "localhost",
  entities: ["./entities/*.ts"],
  migrations: ["./migrations/*.ts"],
};
