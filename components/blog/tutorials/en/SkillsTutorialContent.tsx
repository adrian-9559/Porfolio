"use client";
import Link from "next/link";

import {
  BlogCallout,
  BlogCode,
  BlogH2,
  BlogH3,
  BlogLi,
  BlogOl,
  BlogP,
  BlogUl,
} from "@/components/blog/shared";
import { getContentByTag, typeSlug } from "@/lib/blog/registry";

export default function SkillsTutorialContent() {
  const skills = getContentByTag("skills");

  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 mb-8">
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800/50">
          Tutorial
        </span>
        <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
          12 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-4"
        style={{ letterSpacing: "-0.03em" }}
      >
        How to use Skills in OpenCode
      </h1>
      <p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed mb-8">
        Complete guide to the Skills system: what they are, how to load them, how
        to create them, and how to get the most out of them in your projects.
      </p>

      <div className="h-px bg-black/8 dark:bg-white/8 mb-8" />

      <BlogH2>What are Skills?</BlogH2>
      <BlogP>
        <strong>Skills</strong> are reusable instructions that give
        the AI expert knowledge about a specific task. They are like knowledge
        plugins: you load a skill and the AI immediately knows how to design
        a banner, write a test, audit security, or generate a
        presentation.
      </BlogP>
      <BlogP>
        Each skill is a <code>SKILL.md</code> file with detailed
        instructions, examples, references, and in some cases auxiliary scripts.
        When activated, the skill content is injected into the agent's prompt,
        giving it specialized context without you having to explain anything.
      </BlogP>

      <BlogH2>Architecture</BlogH2>
      <BlogP>Skills follow a modular structure:</BlogP>
      <BlogUl>
        <BlogLi>
          <strong>SKILL.md</strong> — the main file with instructions,
          examples, and references
        </BlogLi>
        <BlogLi>
          <strong>scripts/</strong> — optional, contains auxiliary tools
          (BM25 search, validation)
        </BlogLi>
        <BlogLi>
          <strong>data/</strong> — optional, CSV datasets with design
          patterns, strategies, etc.
        </BlogLi>
        <BlogLi>
          <strong>assets/</strong> — optional, images, templates, static
          resources
        </BlogLi>
      </BlogUl>

      <BlogH2>How to load a Skill</BlogH2>
      <BlogP>There are two ways to activate a skill:</BlogP>

      <BlogH3>1. From chat (tool call)</BlogH3>
      <BlogP>
        Use the <code>skill</code> tool directly in the conversation.
        The agent will load the skill and have it available for the rest of the
        session:
      </BlogP>
      <BlogCode>{`# The agent automatically detects when to activate a skill
# But you can also ask explicitly:

"Use the design skill to create a banner"
"Load the Supabase skill to help me with the migration"
"Activate the Node.js backend patterns skill"`}</BlogCode>

      <BlogH3>2. From the system (AGENTS.md / CLAUDE.md)</BlogH3>
      <BlogP>
        You can reference skills in your project's instructions file.
        When the AI starts, it will load the skills automatically:
      </BlogP>
      <BlogCode>{`# In AGENTS.md or CLAUDE.md:
Use the frontend-design skill for any UI task.
Use the supabase skill when working with the database.`}</BlogCode>

      <BlogP>
        This is the most powerful approach: configure it once and the AI will
        know which skills to use based on the task, without you having to ask
        every time.
      </BlogP>

      <BlogH2>Structure of a SKILL.md</BlogH2>
      <BlogP>Each skill has a clear section structure:</BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Metadata</strong> — name, short description, when to
          activate it
        </BlogLi>
        <BlogLi>
          <strong>Instructions</strong> — step-by-step guide on how to execute the
          task
        </BlogLi>
        <BlogLi>
          <strong>Examples</strong> — real use cases with code
        </BlogLi>
        <BlogLi>
          <strong>References</strong> — links to documentation, external
          resources
        </BlogLi>
        <BlogLi>
          <strong>Scripts</strong> — auxiliary tools (search,
          validation, generation)
        </BlogLi>
      </BlogUl>

      <BlogH2>Create your own Skill</BlogH2>
      <BlogP>
        Skills are stored in <code>.agents/skills/</code> or
        <code>.claude/skills/</code>. To create a new one:
      </BlogP>
      <BlogOl>
        <BlogLi>
          Create a folder with your skill name:
          <code>.agents/skills/my-skill/</code>
        </BlogLi>
        <BlogLi>
          Create the <code>SKILL.md</code> file with the
          instructions
        </BlogLi>
        <BlogLi>
          (Optional) Add scripts or datasets in subfolders
          <code>scripts/</code> and <code>data/</code>
        </BlogLi>
        <BlogLi>
          The skill is available instantly — just mention it in the chat or
          in AGENTS.md
        </BlogLi>
      </BlogOl>

      <BlogH3>Minimal SKILL.md example</BlogH3>
      <BlogCode>{`# My Skill

## Description
Do X when Y happens.

## Instructions
1. Step one
2. Step two
3. Step three

## Examples
\`\`\`
Example code
\`\`\`

## References
- Relevant documentation
- Useful links`}</BlogCode>

      <BlogCallout type="tip">
        You don't need to register the skill anywhere. Just by existing in the
        <code>.agents/skills/</code> folder, the system recognizes it. Just
        mention it by name and the agent will load it.
      </BlogCallout>

      <BlogH2>Where Skills are stored</BlogH2>
      <BlogP>
        Skills can be in three locations, each with a different
        purpose:
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>
            <code>~/.agents/skills/</code>
          </strong>{" "}
          — global user skills, available in all projects
        </BlogLi>
        <BlogLi>
          <strong>
            <code>~/.claude/skills/</code>
          </strong>{" "}
          — global Claude skills, compatible with Claude Code
        </BlogLi>
        <BlogLi>
          <strong>
            <code>.claude/skills/</code> and <code>.opencode/skills/</code>
          </strong>{" "}
          — project skills, only available in that repository
        </BlogLi>
      </BlogUl>
      <BlogP>
        This hierarchy allows having general skills (like design or Supabase)
        always available, and project-specific skills (like "how to
        deploy this app" or "team conventions") only in the relevant
        repo.
      </BlogP>

      <BlogH2>Reusing across skills</BlogH2>
      <BlogP>
        If you have overlapping skills (e.g., <strong>design</strong> and
        <strong>banner-design</strong> share a token system), you can
        reference one from another in the SKILL.md:
      </BlogP>
      <BlogCode>{`## Dependencies
This skill complements \`design\`.
Load \`ui-styling\` if you need frontend code.`}</BlogCode>
      <BlogP>
        The AI will understand it should load multiple skills if the task
        requires it.
      </BlogP>

      <BlogCallout type="done">
        Skills are the most efficient way to share specialized
        knowledge with the AI. Instead of explaining context every time,
        you encapsulate reusable expertise in files that the AI loads on
        demand.
      </BlogCallout>

      {skills.length > 0 && (
        <section className="mt-12 rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] overflow-hidden">
          <div className="px-5 py-3 border-b border-black/8 dark:border-white/8">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              Available skills ({skills.length})
            </p>
          </div>
          <ul className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
            {skills.map((s) => (
              <li key={s.slug}>
                <Link
                  className="flex items-center gap-3 px-5 py-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors no-underline group"
                  href={`/blog/${typeSlug(s.type)}/${s.slug}`}
                >
                  <span
                    aria-hidden="true"
                    className={`w-1.5 h-1.5 rounded-full ${s.categoryColor} flex-shrink-0`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                      {s.title}
                    </p>
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b] line-clamp-1">
                      {s.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-5 py-2 border-t border-black/8 dark:border-white/8">
            <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">
              Articles tagged as{" "}
              <strong className="text-[#1d1d1f] dark:text-white">skills</strong>{" "}
              appear here automatically.
            </p>
          </div>
        </section>
      )}
    </article>
  );
}
