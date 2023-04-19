const inflection = require("inflection");

function generator(/** @type {import('plop').NodePlopAPI} */ plop) {
  // Helpers
  plop.setHelper("singularize", (name) => inflection.singularize(name));
  plop.setHelper("className", (name) => {
    const pascalCase = plop.getHelper("pascalCase");
    return pascalCase(inflection.singularize(name));
  });

  // Generators
  plop.setGenerator("resource", {
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your resource name?",
        validate: (value) => {
          if (/^[a-z]+(?:-[a-z]+)*$/.test(value)) return true;
          return "name is required (e.g.: user-configurations, documents)";
        },
      },
    ],
    actions: [
      {
        type: "addMany",
        destination: "src/functions/{{name}}/",
        templateFiles: ".tools/templates/resource/**/*.*",
        base: ".tools/templates/resource/",
        abortOnFail: true,
      },
      {
        type: "modify",
        path: "src/config/types.ts",
        pattern: /(\}\;)/g,
        templateFile: ".tools/templates/types/types.partial.ts.hbs",
      },
      {
        type: "modify",
        path: "src/config/ioc.config.ts",
        pattern: /(\nexport const container \= new Container\(\)\;)/g,
        templateFile: ".tools/templates/ioc/imports.ioc.config.ts.hbs",
      },
      {
        type: "append",
        path: "src/config/ioc.config.ts",
        templateFile: ".tools/templates/ioc/binds.ioc.config.ts.hbs",
      },
      {
        type: "modify",
        path: "serverless.yml",
        pattern: /(functions\:)/g,
        templateFile: ".tools/templates/serverless/functions.serverless.yml.hbs",
      },
      {
        type: "modify",
        path: "serverless.yml",
        pattern: /(Resources\:)/g,
        templateFile: ".tools/templates/serverless/resource.serverless.yml.hbs",
      },
    ],
  });
}

module.exports = generator;
