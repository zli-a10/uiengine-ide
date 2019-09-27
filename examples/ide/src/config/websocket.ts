export default {
  port: 3001, // default 3000
  host: "localhost", // default localhost
  paths: {
    schema: "./public/schema/ui",
    plugin: "./src/plugins",
    component: "./src/component/my",
    datasource: "./public/schema/data",
    listener: "./src/listeners"
  },
  templates: {
    schema: "./src/templates/schemas",
    plugin: "./src/templates/plugins",
    component: "./src/templates/components",
    datasource: "./src/templates/datasources",
    listener: "./src/templates/listeners"
  }
};
