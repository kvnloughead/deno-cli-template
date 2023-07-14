// #!/usr/bin/env deno run --allow-env --allow-read
// @deno-types="./app.d.ts"

import { Command, CompletionsCommand, parse } from './deps.ts';

import { example } from './commands/index.ts';

import { getConfig } from './config/index.ts';
import { DEFAULT_CONFIG, PROGRAM_NAME } from './utils/constants.ts';

const config = await getConfig(
  DEFAULT_CONFIG,
  parse(Deno.args, {
    boolean: ['dev', 'force', 'help', 'verbose'],
    alias: {
      cfg: 'config',
      force: 'f',
      help: 'h',
      verbose: 'v',
    },
  }),
);

const program = new Command();
program
  .name(PROGRAM_NAME)
  .version('0.1.0')
  .description('Describe the program.')
  .globalOption('--dev', 'Run in development mode.')
  .globalOption('--cfg, --config <file>', 'Configuration file to use.', {
    default: DEFAULT_CONFIG,
  })
  .globalOption('-f, --force', 'Take action without confirmation.')
  .globalOption('-v, --verbose', 'Provides verbose logging.')
  .globalComplete('exampleCompletion', () => {
    // return array of completions consume the completion by specifying
    // its name on arguments
    return [];
  })
  // example subcommand
  .command('example <arg>', 'Describe the command.')
  .arguments('<arg:string:exampleCompletion>')
  .option(
    '--flag <value>',
    'Describe the usage of the flag. If flag is boolean, specify it when parsing the args. Aliases should also be specified when parsing the args.',
  )
  .action((options: Options, ...args: string[]) => {
    options = { ...options, ...config };
    example(options, args);
  });

await program.command('completions', new CompletionsCommand()).parse(Deno.args);
