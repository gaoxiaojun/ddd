function pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
}

function getYMD(date: Date): number[] {
    const [year, month, day] = [
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
    ];

    return [year, month, day];
}

export const URL_ROOT = 'https://datafeed.dukascopy.com/datafeed';

function getDayUrls(
    instrument: string,
    date: Date,
): string[] {
    const [yearPad, monthPad, dayPad] = getYMD(date).map(pad);
    let url = `${URL_ROOT}/${instrument.toUpperCase()}/${yearPad}/${monthPad}/${dayPad}/`;
    const urls = [];
    for (let hour = 0; hour < 24; hour++) {
        const hourPad = pad(hour);
        url += `${hourPad}h_ticks.bi5`;
        urls.push(url);
    }

    return urls;
}
