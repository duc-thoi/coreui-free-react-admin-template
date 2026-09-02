---
name: guidelines
description: Save or update persistent project design guidelines. Use when the user invokes /guidelines, asks the agent to remember a design rule, or wants design guidance applied to future code edits, new components, component updates, or design variants.
---

# Project design guidelines

Store the user's design guidance in the repository so future agent sessions
apply it. Use normal file-editing and shell tools. Preserve existing agent
configuration and user-authored content.

## Input

Use the user's request as the guideline. For `/guidelines`, use the text after
the command. If the user did not provide a guideline, ask for it before editing
files.

Treat the user's wording, examples, measurements, tokens, and references as
authoritative. Do not infer additional aesthetic preferences from the codebase.

## Classify the guideline

Put each guideline in one or more of these scopes:

1. **All code edits**: a rule that must affect every relevant code change, not
   only explicit design work. Store it in the active harness's project
   instruction file.
2. **New design**: guidance specifically for creating a new component, screen,
   view, or other UI surface. Store it in `new-design`.
3. **Update design**: guidance specifically for changing the design of an
   existing component or surface. Store it in `update-design`.
4. **Iterate design**: guidance specifically for generating, comparing,
   experimenting on, or refining design variants. Store it in
   `iterate-design`.

A guideline may belong to multiple design skills. Do not put design-only
guidance in the all-code-edits scope. If the classification materially changes
where or when the rule applies and the user's intent is ambiguous, ask one
focused question before writing.

## Native harness locations

Use the locations for the harness running this chat:

| Harness                            | Project instructions | Skills root      |
| ---------------------------------- | -------------------- | ---------------- |
| Claude Code                        | `CLAUDE.md`          | `.claude/skills` |
| Codex, Cursor, Gemini, and Copilot | `AGENTS.md`          | `.agents/skills` |

Hexby may have linked these locations to another harness's established files.
Follow symlinks. Never replace a regular file, directory, or symlink to force a
different layout.

If both instruction files or skill roots exist independently rather
than through symlinks, update the managed guideline section in every independent
configuration so the rule stays consistent across the team's harnesses.

## Bootstrap when needed

Create the active project instruction file only when an all-code-edits
guideline needs it. Preserve all existing content and add or update this block:

```md
<!-- hexby-design-guidelines:start -->

## Design guidelines

- Guideline text

<!-- hexby-design-guidelines:end -->
```

Ensure these three skills exist in every independent native skills root. A new
skill must have the shown frontmatter, its workflow, and the managed project
guidelines block. If a same-named skill already exists, preserve its frontmatter
and body and only add or update the managed block.

### `new-design`

```md
---
name: new-design
description: Design and implement a new UI component, screen, view, or composed surface. Use when creating a design surface that does not yet exist; do not use for a directed update to an existing design or for comparing multiple variants.
---

# New design

Inspect the repository's existing design system, components, tokens, and nearby
patterns before designing. Apply the project-specific guidelines below. After
implementation, verify the rendered result at relevant sizes and in every
supported theme. When Hexby component tools are available, wait for rendering
to settle and inspect the resulting screenshot.

If the user's request conflicts with a hard project-specific guideline, raise
the conflict with the user before making changes and link them to [project
guideline settings](#hexby-guidelines) so they can review it.

<!-- hexby-project-guidelines:start -->

## Project-specific guidelines

<!-- hexby-project-guidelines:end -->
```

### `update-design`

```md
---
name: update-design
description: Update the visual design, layout, styling, accessibility, or interaction of an existing UI component or screen. Use for a directed refinement to an existing design; do not use for a new component or a multi-variant experiment.
---

# Update design

Inspect the existing implementation and rendered state before editing. Preserve
the component's intended behavior and public contract unless the user requests
otherwise. Apply the project-specific guidelines below, then compare the result
with the prior state at relevant sizes and in every supported theme. When Hexby
component tools are available, capture the current state, wait for refresh, and
inspect the after screenshot.

If the user's request conflicts with a hard project-specific guideline, raise
the conflict with the user before making changes and link them to [project
guideline settings](#hexby-guidelines) so they can review it.

<!-- hexby-project-guidelines:start -->

## Project-specific guidelines

<!-- hexby-project-guidelines:end -->
```

### `iterate-design`

```md
---
name: iterate-design
description: Generate, compare, and refine multiple design variants for a UI component, screen, or view. Use when the user asks to iterate, experiment, explore options, compare approaches, or create variants; do not use for one directed design update.
---

# Iterate design

Inspect the existing design context before proposing variants. Make variants
meaningfully distinct while applying the project-specific guidelines below.
Keep comparison conditions consistent, including content, viewport, and theme.
Show the differences clearly, gather the user's preference when selection is
required, and refine the chosen direction. When Hexby component tools are
available, wait for each variant to render and use screenshots for comparison.

If the user's request conflicts with a hard project-specific guideline, raise
the conflict with the user before making changes and link them to [project
guideline settings](#hexby-guidelines) so they can review it.

<!-- hexby-project-guidelines:start -->

## Project-specific guidelines

<!-- hexby-project-guidelines:end -->
```

## Editing rules

- Keep each stored rule concise while preserving concrete constraints and
  examples.
- Avoid duplicate bullets. Update an existing equivalent rule when the new
  wording supersedes it.
- Change only the relevant managed blocks in existing files.
- Do not delete unrelated instructions or skills.
- Do not create vendor-specific copies when the native locations are already
  connected by symlinks.
- Use relative symlinks only when a missing harness path must be connected to
  an established configuration. Never remove a conflicting path.

After writing, state how the guideline was classified and list the files or
linked configurations updated.
