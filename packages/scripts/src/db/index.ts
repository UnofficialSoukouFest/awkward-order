import PouchDB from 'pouchdb'
import fs from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import { filename } from 'pathe/utils'

export const POUCHDB_DBNAME = 'latimeriadb'

export interface SyncFileSchema {
  _rev?: string
  _id: string
  hash: string
  date: string
}

export class LatimeriaDB {
  private db: PouchDB.Database<SyncFileSchema>
  filePathList: string[]

  constructor(realSyncPath: string, matchRule: RegExp) {
    this.db = new PouchDB(POUCHDB_DBNAME)
    const fileList = fs.readdirSync(realSyncPath, {
      withFileTypes: true,
    })

    const filteredFileList: string[] = []
    for (const dirent of fileList) {
      if (!dirent.isFile()) {
        continue
      }
      if (matchRule.test(dirent.name)) {
        filteredFileList.push(`${realSyncPath}/${dirent.name}`)
      }
    }
    this.filePathList = filteredFileList
  }

  async put(id: string, date: Date) {
    const matchFilePath = this.filePathList.find(v => filename(v) === id)
    if (!matchFilePath) {
      return
    }
    const content = await readFile(
      path.join(matchFilePath),
    )
    const hash = crypto.createHash('sha256').update(new Uint8Array(content)).digest('hex')

    this.getById(id)
      .then((document_) => {
        const document: SyncFileSchema = {
          _rev: document_._rev,
          _id: id,
          date: date.toISOString(),
          hash,
        }
        this.db.put(document)
      })
      .catch(() => {
        const document: SyncFileSchema = {
          _id: id,
          date: date.toISOString(),
          hash,
        }
        this.db.put(document)
      })
      .catch(console.error)
  }

  async getById(id: string): Promise<SyncFileSchema> {
    return await this.db.get(id)
  }
}
