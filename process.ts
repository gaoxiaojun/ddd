import { instrumentMetaData } from './instrumentMetaData'

function roundNum(value: number, decimal = 4): number {
    return Number(value.toFixed(decimal));
}

function getNormaliser(
    startMs: number,
    decimalFactor: number
): (values: number[]) => number[] {

    return function (values: number[]): number[] {
        const [ms, ask, bid, askVolume, bidVolume] = values;

        return [
            ms + startMs,
            ask / decimalFactor,
            bid / decimalFactor,
            ...([askVolume, bidVolume].map(a => roundNum(a)))
        ];
    };

}

export function normalise(data: Buffer, startTs: number, instrument: string): number[][] {
    const { decimalFactor } = instrumentMetaData[instrument];

    const normaliserFn = getNormaliser(startTs, decimalFactor);

    const normalizedData = data.map(normaliserFn);

    return normalizedData;
}

function processData(instrument: string, url: string, buffer: Buffer) {
    const urlDate = getDateFromUrl(url);
    const decompressedData = decompress(buffer);
    const startTs = +urlDate;
    const normalisedData = normalise(decompressedData, startTs, instrument);

    return normalisedData;
}
