import Database from 'better-sqlite3';

const db = new Database('otp.sqlite');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    userId TEXT PRIMARY KEY,
    secret TEXT NOT NULL,
    isEnabled INTEGER DEFAULT 0
  );
`);

export function getUserOtpSecret(userId: string): string | null {
    const row = db
        .prepare('SELECT secret FROM users WHERE userId = ?')
        .get(userId);
    return row?.secret || null;
}

export function setUserOtpSecret(userId: string, secret: string) {
    db.prepare(`
    INSERT INTO users (userId, secret)
    VALUES (?, ?)
    ON CONFLICT(userId) DO UPDATE SET secret = excluded.secret
  `).run(userId, secret);
}

export function markUserOtpEnabled(userId: string) {
    db.prepare('UPDATE users SET isEnabled = 1 WHERE userId = ?').run(userId);
}

export function isUserOtpEnabled(userId: string): boolean {
    const row = db
        .prepare('SELECT isEnabled FROM users WHERE userId = ?')
        .get(userId);
    return row?.isEnabled === 1;
}
