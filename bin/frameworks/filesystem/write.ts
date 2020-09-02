import * as fs from 'fs';

import { ErrorWrite } from '../errors/errors';

/**
 * @description Helper that writes files.
 * Prefer using the writeFile function since that is hooked for up for any pre-processing.
 *
 * @param filePath File path minus file name
 * @param fileContent File contents
 */
export async function write(filePath: string, fileContent: string): Promise<boolean> {
  return await new Promise((resolve, reject) => {
    if (!filePath || !fileContent) throw new Error(ErrorWrite);
    try {
      fs.writeFile(filePath, fileContent, 'utf-8', (error) => {
        if (error) throw new Error(`${ErrorWrite}: ${error}`);
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });
}