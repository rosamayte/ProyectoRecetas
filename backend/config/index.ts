export const port: number = parseInt(process.env.RECIPES_PORT || '3000', 10);
export const db: string = process.env.RECIPES_DBURI || 'mongodb://localhost:27017/recipes';
export const token: string = '123456789';
