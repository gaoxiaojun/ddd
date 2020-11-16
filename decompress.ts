// eslint-disable-next-line @typescript-eslint/no-var-requires
const lzmajs = require('lzma-purejs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const struct = require('python-struct');


function decompress(buffer: Buffer): number[][] {

  if (buffer.length === 0) {
    return [];
  }
  const result: number[][] = [];
  const format = '>3i2f';
  const decompressedBuffer = lzmajs.decompressFile(buffer) as Buffer;

  const step = struct.sizeOf(format);

  for (let i = 0, n = decompressedBuffer.length; i < n; i += step) {
    const chunk = decompressedBuffer.slice(i, i + step);
    const unpacked = struct.unpack(format, chunk);

    result.push(unpacked);
  }

  return result;
}

export { decompress };
