/* prompt.js — System prompt for Call 1
 *
 * Import and pass as `system` in the /api/anthropic fetch call inside App.jsx.
 * Keep prompts here (not inline) so Monica can edit in GitHub without touching logic.
 */

const SYSTEM_PROMPT = `
[Replace this with the tool's system prompt.]

[Describe the tool's persona, what it analyzes, and what format to return results in.]

[If returning structured data, specify the JSON schema here and instruct the model
to return ONLY valid JSON — no preamble, no markdown fences.]
`;

export default SYSTEM_PROMPT;
