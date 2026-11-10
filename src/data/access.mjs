// Who can get an API key, and how Mac owners join. One switch for the whole site:
// [[API_ACCESS]] and [[MAC_ACCESS]] in any page body or frontmatter become these sentences.
// Open sign-up is live and in the terms (Nat, 10 Nov 2026). Set API_ACCESS=invite if OPEN_SIGNUP_ENABLED is turned off.
export const API_ACCESS = process.env.API_ACCESS === 'invite' ? 'invite' : 'open';

export const API_ACCESS_TEXT = {
  invite: 'API keys are invite only for now: join the API list at smartypants.network/api and Smarty Pants emails you when access opens.',
  open: 'Anyone can sign up with an email at smartypants.network/api and create a key; new accounts get $10 of free credit, usable for 90 days.',
};

export const MAC_ACCESS_TEXT =
  'Mac owners join separately: run the browser check, leave your email, and wait for an invite to the Mac app, which is invite only for now.';

/** What API customers must know about owner-side confidentiality. Same words everywhere. */
export const PRIVACY_TEXT =
  "Requests run on Macs owned by other people. Owners agree not to read requests and the app doesn't show them, but a serving Mac decrypts each request in memory to answer it, so that is a rule and a design, not a technical guarantee. Don't send sensitive data on the general network.";

export const expandTokens = (s) =>
  s.replaceAll('[[API_ACCESS]]', API_ACCESS_TEXT[API_ACCESS]).replaceAll('[[MAC_ACCESS]]', MAC_ACCESS_TEXT).replaceAll('[[PRIVACY]]', PRIVACY_TEXT);

/** Remark plugin: expands the tokens in Markdown text. */
export function remarkAccessTokens() {
  const walk = (node) => {
    if (typeof node.value === 'string' && node.value.includes('[[')) node.value = expandTokens(node.value);
    (node.children || []).forEach(walk);
  };
  return (tree) => walk(tree);
}
