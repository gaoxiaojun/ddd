import { Command } from "https://deno.land/x/cliffy/command/command.ts";

const {options} = await new Command()
  .name("duka")
  .version("0.1.0")
  .description("Dukascopy Tickdata Downloader")
  .option("-f, --from <date>", "Start date")
  .option("-t, --to <date></date>", "End Date")
  .option("-s, --symbol <symbol_list>", "Symbol list, split by ','")
  .parse(Deno.args);

  console.log("Symbol: %s from: %s to: %s", options.symbol, options.from, options.to);