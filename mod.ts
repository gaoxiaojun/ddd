import { Command } from "https://deno.land/x/cliffy/command/command.ts";
import { printf, sprintf } from "https://deno.land/std/fmt/printf.ts";
import { cyan, gray, red, yellow } from "https://deno.land/std/fmt/colors.ts";

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

if (options.symbol !== undefined) {
  const url = sprintf(bi5UrlTemplate, options.symbol, 2010, 1, 1, 1);
  console.log(url);
}
console.log(
  "Symbol: %s from: %s to: %s",
  options.symbol,
  options.from,
  options.to,
);
