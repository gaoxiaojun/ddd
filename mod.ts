// deno-lint-ignore-file
import { Command } from "https://deno.land/x/cliffy/command/command.ts";
import { printf, sprintf } from "https://deno.land/std/fmt/printf.ts";
import { parse } from "https://deno.land/std/datetime/mod.ts";

const bi5UrlTemplate =
  "https://www.dukascopy.com/datafeed/%s/%04d/%02d/%02d/%02dh_ticks.bi5";

const { options } = await new Command()
  .name("duka")
  .version("0.1.0")
  .description("Dukascopy Tickdata Downloader")
  .option("-f, --from <date>", "Start date")
  .option("-t, --to <date></date>", "End Date")
  .option("-s, --symbol <symbol_list>", "Symbol list, split by ','")
  .parse(Deno.args);

// from_date:Date, to_date:Date;
let from_date = options.from_date !== undefined
  ? parse(options.from, "yyyy-MM-dd")
  : new Date();
let to_date = options.to_date !== undefined
  ? parse(options.to, "yyyy-MM-dd")
  : new Date();
if (options.symbol === undefined) Deno.exit(1);
const url = sprintf(
  bi5UrlTemplate,
  options.symbol,
  from_date.getFullYear(),
  from_date.getMonth(),
  from_date.getDate(),
  0,
);
console.log(url);
console.log(
  "Symbol: %s from: %s to: %s",
  options.symbol,
  options.from,
  options.to,
);
