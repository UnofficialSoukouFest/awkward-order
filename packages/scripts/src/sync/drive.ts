import fs from 'node:fs/promises'
import path from 'node:path'
import { drive_v3 } from 'googleapis'
import { type BaseSyncAgent, type SyncMode } from './index'
import { LatimeriaDB } from '../db'

interface SyncAgentOptions {
  folderID: string
  realSyncPath: string
  matchRule: RegExp
  force: boolean
}

export class SyncAgent implements BaseSyncAgent<SyncAgentOptions, drive_v3.Drive> {
  options: SyncAgentOptions
  db: LatimeriaDB

  constructor(options: SyncAgentOptions) {
    this.options = options
    this.db = new LatimeriaDB(options.realSyncPath, options.matchRule)
  }

  async setup(): Promise<void> {
    return
  }

  async sync(drive: drive_v3.Drive, mode: SyncMode): Promise<void> {
    if (mode !== 'download') {
      return
    }
    const files = await drive.files.list({
      q: `'${this.options.folderID}' in parents`,
      fields: 'files(id, name, sha256Checksum)',
    })

    if (!files.data.files) {
      return
    }

    for (const file of files.data.files) {
      if (!file.name || !file.id) continue

      try {
        const localFileInfo = await this.db.getById(file.name)
        if (localFileInfo.hash !== file.sha256Checksum) {
          const GFileData = await drive.files.get({
            fileId: file.id,
            supportsAllDrives: true,
            alt: 'media',
          })

          const buf = GFileData.data as unknown as Blob
          const buffer = new Uint8Array(await buf.arrayBuffer())
          await fs.writeFile(
            path.join(this.options.realSyncPath, file.name),
            buffer,
          )
        }
      }
      catch {
        const GFileData = await drive.files.get({
          fileId: file.id,
          supportsAllDrives: true,
          alt: 'media',
        })

        const buf = GFileData.data as unknown as Blob
        const buffer = new Uint8Array(await buf.arrayBuffer())
        await fs.writeFile(
          path.join(this.options.realSyncPath, file.name),
          buffer,
        )
        await this.db.put(file.name, new Date())
      }
    }
  }
}
