export const PROGRAM_NAME = "cli"; // replace with app's name

export const DEFAULT_CONFIG = `${
  Deno.env.get("HOME") || ""
}/.config/${PROGRAM_NAME}/settings.json`;

export const ALIASES: { commands: Record<string, string> } = {
  commands: { edit: "e", cat: "c", open: "o", remove: "rm", list: "l" },
};
