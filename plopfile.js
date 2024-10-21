module.exports = function (plop) {
  plop.setGenerator("crud", {
    description: "Generate CRUD and Prisma model for a new App",
    prompts: async (inquirer) => {
      const { name } = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Enter the App name (singular, e.g., 'user'):",
          validate: (input) =>
            input ? true : "App name cannot be empty.",
        },
      ]);

      const fields = [];
      let addMoreFields = true;

      // Loop to keep asking for field info
      while (addMoreFields) {
        const { fieldName, fieldType } = await inquirer.prompt([
          {
            type: "input",
            name: "fieldName",
            message: "Enter field name (type ':q' and hit enter to finish):",
            validate: (input) =>
              input === ":q" || /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(input)
                ? true
                : "Field name must be a valid identifier (letters, numbers, underscores, but not starting with a number).",
          },
          {
            type: "list",
            name: "fieldType",
            message: "Select field type:",
            choices: [
              "String",
              "Int",
              "Boolean",
              "DateTime",
              "Float",
              "Decimal",
              "Json",
            ],
            when: (answers) => answers.fieldName !== ":q",
          },
        ]);

        // exit
        if (fieldName === ":q") {
          addMoreFields = false;
        } else {
          fields.push({ name: fieldName, type: fieldType });
          console.log(`Field added: ${fieldName} (${fieldType})`);
        }
      }

      return { name, fields };
    },
    actions: [
      // Create controller for Create operation
      {
        type: "add",
        path: "src/modules/{{camelCase name}}/controllers/{{pascalCase name}}CreateController.ts",
        templateFile: "templates/controllerCreate.ts.hbs",
      },
      // Create controller for Update operation
      {
        type: "add",
        path: "src/apps/{{camelCase name}}/controllers/{{pascalCase name}}UpdateController.ts",
        templateFile: "templates/controllerUpdate.ts.hbs",
      },
      // Create controller for Delete operation
      {
        type: "add",
        path: "src/apps/{{camelCase name}}/controllers/{{pascalCase name}}DeleteController.ts",
        templateFile: "templates/controllerDelete.ts.hbs",
      },
      // Create controller for Get operation
      {
        type: "add",
        path: "src/modules/{{camelCase name}}/controllers/{{pascalCase name}}GetController.ts",
        templateFile: "templates/controllerGet.ts.hbs",
      },
      // Create index.ts for controllers
      {
        type: "add",
        path: "src/modules/{{camelCase name}}/controllers/index.ts",
        templateFile: "templates/controllersIndexTemplate.hbs",
      },
      // Create Routes file
      {
        type: "add",
        path: "src/modules/{{camelCase name}}/routes/{{pascalCase name}}Routes.ts",
        templateFile: "templates/routes.ts.hbs",
      },
      // Create Service file
      {
        type: "add",
        path: "src/modules/{{camelCase name}}/services/{{pascalCase name}}Service.ts",
        templateFile: "templates/service.ts.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{camelCase name}}/types/{{pascalCase name}}Types.ts",
        templateFile: "templates/types.ts.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{camelCase name}}/index.ts",
        templateFile: "templates/index.ts.hbs",
      },
      // new model
      {
        type: "append",
        path: "prisma/schema.prisma",
        pattern: /$/g,
        templateFile: "templates/model.prisma.hbs",
      },
    ],
  });

  // Prisma types to TypeScript types
  plop.setHelper("typeMapping", (prismaType) => {
    switch (prismaType) {
      case "String":
        return "string";
      case "Int":
      case "Float":
      case "Decimal":
        return "number";
      case "Boolean":
        return "boolean";
      case "DateTime":
        return "Date";
      case "Json":
        return "any";
      default:
        return "any";
    }
  });
};
