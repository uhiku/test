import { spawnSync } from 'child_process';
import { writeFileSync, readFileSync, unlinkSync } from 'fs';

export function ffmpegTrim(
  fileName: string,
  file: Buffer,
  start: number,
  to: number
): Buffer {
  writeFileSync(`/tmp/${fileName}`, file);
  runTrimCommand(fileName, start.toString(), to.toString());

  const trimmedFile = readFileSync(`/tmp/${fileName}_trimmed.mp3`);
  unlinkSync(`/tmp/${fileName}_trimmed.mp3`);
  unlinkSync(`/tmp/${fileName}`);

  return trimmedFile;
}


function runTrimCommand(name: string, start: string, to: string): void {
  spawnSync(
    '/opt/ffmpeg/ffmpeg',
    [
      '-i',
      `/tmp/${name}`,
      '-ss',
      start,
      '-t',
      to,
      '-c',
      'copy',
      `/tmp/${name}_trimmed.mp3`,
    ],
    { stdio: 'inherit' }
  );
}
