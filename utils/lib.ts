import { path } from '../deps.ts';

import { ALIASES } from './constants.ts';

/**
 *
 * Confirms an action with the user if force is falsey.
 *
 * @param {boolean} force - If true, the action will be confirmed without prompting the user.
 * @param {string} msg - The message to display to the user in the confirmation prompt.
 * @returns {boolean} - Returns true if the user confirms the action or if force is truthy, otherwise false.
 */
export function confirmAction(force: boolean, msg: string) {
  let confirm;
  if (!force) {
    confirm = prompt(msg);
  }
  return force || (confirm && ['y', 'yes'].includes(confirm.toLowerCase()));
}

export async function parseJsonFile(filepath: string): Promise<Options> {
  const data = await Deno.readFile(filepath);
  const decoder = new TextDecoder('utf-8');
  const text = decoder.decode(data);
  return JSON.parse(text);
}

export function addUserDir(filepath: string) {
  const home = Deno.env.get('HOME') || '';
  return filepath.startsWith(home) ? filepath : path.join(home, filepath);
}

/**
 * Parses a cli command, returning original command, or the appropriate alias.
 *
 * @param {string} command - a cli command or alias
 * @returns {{string|undefined}} - the command corresponding to the alias, or else the original command param
 */
export function parseCommand(command: string): string | undefined {
  const commands = Object.keys(ALIASES.commands);
  if (commands.includes(command)) return command;
  return commands.find((key) => ALIASES.commands[key] === command) || command;
}

export function logError(err: Error) {
  console.log(`\n`);
  console.error(err);
  console.log(`\n`);
}

export function log(message?: unknown, ...optionalParams: unknown[]) {
  console.log('\n' + message, ...optionalParams, '\n');
}
