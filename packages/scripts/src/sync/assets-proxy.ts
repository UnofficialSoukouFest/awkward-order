import { type BaseSyncAgent, type SyncMode } from './index'
import type { LatimeriaAssetsClient } from '../assets-proxy-client'
import { LatimeriaDB } from '../db'
import { readFile } from 'node:fs/promises'
import mime from 'mime'
import { filename } from 'pathe/utils'
import path from 'node:path'

interface AssetsProxySyncAgentOptions {
  matchRule: RegExp
  realSyncPath: string
}

export class AssetsProxySyncAgent implements BaseSyncAgent<AssetsProxySyncAgentOptions, LatimeriaAssetsClient> {
  db: LatimeriaDB
  options: AssetsProxySyncAgentOptions

  constructor(options: AssetsProxySyncAgentOptions) {
    this.options = options
    this.db = new LatimeriaDB(options.realSyncPath, options.matchRule)
  }

  async setup(): Promise<void> {
    return
  }

  async sync(client: LatimeriaAssetsClient, mode: SyncMode): Promise<void> {
    if (mode !== 'upload') {
      return
    }
    for (const filePath of this.db.filePathList) {
      const fileName = filename(filePath)
      if (!fileName) {
        continue
      }
      const fileBaseName = path.basename(filePath)
      const fileContent = await readFile(filePath)
      const fileObject = new File([new Uint8Array(fileContent)], fileBaseName, {
        type: mime.getType(filePath) ?? undefined,
      })
      await client.uploadAssets(fileObject, fileBaseName)
    }
  }
}
