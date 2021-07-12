import { Command } from "./deps.ts";

await new Command()
  .description("Main command.")
  .option("-a, --aa", "Main command option.")
  .command("command1 <file|dir>")
  .description("Command1 description.")
  .option("-b, --bb", "Command1 option.")
  //   .action((options: any, source: string, destination: string) => {
  //     console.log("Command1");
  //     console.log(options);
  //     console.log(source);
  //     console.log(destination);
  //   })
  //   .command("command2", new Command())
  //   .description("Command2 description.")
  //   .option("-c, --cc", "Command2 option.")
  //   .action((options: any, source: string, destination: string) => {
  //     console.log("Command2");
  //     console.log(options);
  //     console.log(source);
  //     console.log(destination);
  //   })
  //   .reset() // reset command pointer
  //   .option("-e, --ee", "Second main command option.")
  //   .action((options: any, source: string, destination: string) => {
  //     console.log("Main command");
  //     console.log(options);
  //     console.log(source);
  //     console.log(destination);
  //   })
  .parse(Deno.args);
