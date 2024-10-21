# Express TypeScript Prisma CRUD Generator

A CRUD (Create, Read, Update, Delete) generator for APIs using Express.js, TypeScript, and Prisma ORM. It automates CRUD operations with Plop and Handlebars templates for faster development.

## Features

- 🚀 Rapid CRUD API generation
- 🔧 Built with Express.js and TypeScript
- 📦 Prisma ORM for database interactions
- 🛠 Code generation with Plop.js
- 📝 Customizable Handlebars templates
- 🔄 Automated route and controller creation

## Prerequisites

- Node.js (v14+)
- pnpm (v6+)
- TypeScript

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/AtnafOli/express-ts-prisma-template.git
   cd express-ts-prisma-template
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```
   ```bash
   pnpm exec prisma init
   ```

3. Configure your database in the `.env` file:

   ```env
   DATABASE_URL="your-database-connection-string"
   ```

4. Run migrations and generate the Prisma client:

   ```bash
   pnpm prisma migrate dev
   pnpm prisma generate
   ```

5. Start the development server:

   ```bash
   pnpm run dev
   ```

## Using the CRUD Generator

1. Run the generator:

   ```bash
   pnpm exec plop crud
   ```

2. Specify the module or app name and fields when prompted.

3. The generator will create:
   - Prisma model
   - Controller
   - Routes
   - Service layer


## Customization

Modify Handlebars templates in `src/templates` for customized code generation.

## Contributing

Contributions welcome! Please submit a Pull Request.

Happy coding! 🚀

