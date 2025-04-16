import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

let dbPromise = open({
    filename: './otp.sqlite',
    driver: sqlite3.Database
})

export async function initDb() {
    const db = await dbPromise
    await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        userId TEXT PRIMARY KEY,
        secret TEXT NOT NULL,
        isEnabled INTEGER DEFAULT 0
    )
    `);
}

export async function getUserOtpSecret(userId: string): Promise<string | null> {
    const db = await dbPromise
    const row = await db.get('SELECT secret FROM users WHERE userId = ?', userId)
    return row?.secret || null
}

export async function setUserOtpSecret(userId: string, secret: string) {
    const db = await dbPromise
    await db.run(
        'INSERT OR REPLACE INTO users (userId, secret, isEnabled) VALUES (?, ?, COALESCE((SELECT isEnabled FROM users WHERE userId = ?), 0))',
        userId,
        secret,
        userId
    )
}

export async function markUserOtpEnabled(userId: string) {
    const db = await dbPromise
    await db.run('UPDATE users SET isEnabled = 1 WHERE userId = ?', userId)
}

export async function isUserOtpEnabled(userId: string): Promise<boolean> {
    const db = await dbPromise
    const row = await db.get('SELECT isEnabled FROM users WHERE userId = ?', userId)
    return row?.isEnabled === 1
}
