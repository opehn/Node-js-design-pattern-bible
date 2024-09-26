import sqlite3 from 'sqlite3'

export function createDb(dbFile) {
    return new sqlite3.Database(dbFile); //싱글턴이 아닌 팩토리 패턴으로 바뀜
}