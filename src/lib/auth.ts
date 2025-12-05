// Простая система аутентификации (для продакшена лучше использовать NextAuth.js или другую библиотеку)

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@vkbouwmaster.com';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Qwaszxedcrfsdx23145';

export function verifyCredentials(email: string, password: string): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

