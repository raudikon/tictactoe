import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import env from 'dotenv'

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
