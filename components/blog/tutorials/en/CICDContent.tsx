"use client";
import { useState } from "react";

import {
  BlogH2,
  BlogH3,
  BlogP,
  BlogCode,
  BlogInlineCode,
  BlogCallout,
} from "@/components/blog/shared";

function ExerciseCard({
  num,
  title,
  level,
  description,
  hint,
  solution,
}: {
  num: number;
  title: string;
  level: "Easy" | "Intermediate" | "Hard";
  description: string;
  hint?: string;
  solution?: string;
}) {
  const [open, setOpen] = useState(false);
  const levelColor = {
    Easy: "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
    Intermediate:
      "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
    Hard: "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
  }[level];

  return (
    <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden">
      <button
        className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-black/3 dark:hover:bg-white/3 transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
            {num}
          </span>
          <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor}`}
          >
            {level}
          </span>
          <span className="text-[#aeaeb2] text-xs">{open ? "▲" : "▼"}</span>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-black/8 dark:border-white/8 pt-3 space-y-3">
          <p className="text-sm text-[#3a3a3c] dark:text-[#aeaeb2]">
            {description}
          </p>
          {hint && (
            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl px-3 py-2 text-xs text-blue-800 dark:text-blue-300">
              <strong>Hint:</strong> {hint}
            </div>
          )}
          {solution && <BlogCode>{solution}</BlogCode>}
        </div>
      )}
    </div>
  );
}

export default function CICDContentEn() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 text-xs text-[#aeaeb2] dark:text-[#636366] mb-4">
        <span className="flex items-center gap-1">
          <svg
            aria-hidden="true"
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          Tutorial
        </span>
        <span className="w-1 h-1 rounded-full bg-[#aeaeb2]" />
        <span className="flex items-center gap-1">
          <svg
            aria-hidden="true"
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          45 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        CI/CD with GitHub Actions
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        GitHub Actions automates the entire pipeline of your repository: every
        push can build, lint, run tests and deploy to production. Learn the
        concepts, the YAML structure and the patterns real projects use.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="what-is-cicd">What is CI/CD?</BlogH2>

      <BlogP>
        <strong>CI (Continuous Integration)</strong> is the practice of
        integrating the whole team's code into the shared repository
        frequently. Each integration is automatically verified with build, lint
        and tests, so errors surface in minutes, not days.
      </BlogP>

      <BlogP>
        <strong>CD (Continuous Delivery / Deployment)</strong> automates the
        release of the verified code. In Continuous Delivery the artifact is
        ready to deploy with a single click; in Continuous Deployment it ships
        to production on its own once the pipeline passes.
      </BlogP>

      <BlogCallout type="info">
        The mental flow: commit → CI verifies everything is healthy → CD
        delivers the artifact → deploy. Each layer fails fast and loudly, so
        the team knows where to look before the problem reaches users.
      </BlogCallout>

      <BlogH2 id="concepts">GitHub Actions concepts</BlogH2>

      <BlogP>
        Actions is structured into five pieces with a clear hierarchy:
      </BlogP>

      <BlogP>
        <strong>Workflow</strong>: the complete YAML file in{" "}
        <BlogInlineCode>.github/workflows/</BlogInlineCode>. It defines the
        automation: when it triggers and what it does.
      </BlogP>
      <BlogP>
        <strong>Event</strong>: what triggers the workflow.{" "}
        <BlogInlineCode>push</BlogInlineCode>,{" "}
        <BlogInlineCode>pull_request</BlogInlineCode>,{" "}
        <BlogInlineCode>schedule</BlogInlineCode>,{" "}
        <BlogInlineCode>workflow_dispatch</BlogInlineCode>...
      </BlogP>
      <BlogP>
        <strong>Job</strong>: a set of steps that run on the same runner. Jobs
        in a workflow run in parallel by default.
      </BlogP>
      <BlogP>
        <strong>Step</strong>: each individual action inside a job: a command,
        a reusable action from the marketplace...
      </BlogP>
      <BlogP>
        <strong>Runner</strong>: the machine that executes jobs. GitHub offers
        hosted runners (ubuntu-latest, macos-latest, windows-latest) and you can
        connect your own.
      </BlogP>

      <BlogH2 id="workflow-structure">Workflow structure</BlogH2>

      <BlogP>
        It all starts with a YAML file inside{" "}
        <BlogInlineCode>.github/workflows/</BlogInlineCode>. The{" "}
        <BlogInlineCode>on</BlogInlineCode> key declares the events that trigger
        it:
      </BlogP>

      <BlogCode>{`# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "Pipeline up and running!"`}</BlogCode>

      <BlogP>
        With <BlogInlineCode>push</BlogInlineCode> the workflow runs on every
        commit to main; with <BlogInlineCode>pull_request</BlogInlineCode> also
        on every PR against main, which is where errors are filtered before
        merging. <BlogInlineCode>workflow_dispatch</BlogInlineCode> adds a
        manual "Run workflow" button in the GitHub UI.
      </BlogP>

      <BlogH2 id="jobs-steps">Jobs and steps</BlogH2>

      <BlogP>
        Each job declares which runner to use and a list of steps executed in
        order. Steps can be community actions (<BlogInlineCode>uses</BlogInlineCode>)
        or shell commands (<BlogInlineCode>run</BlogInlineCode>):
      </BlogP>

      <BlogCode>{`jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # Clone the repository inside the runner
      - uses: actions/checkout@v4

      # Set up Node.js on the machine
      - uses: actions/setup-node@v4
        with:
          node-version: 22

      # Shell command: install dependencies
      - run: npm ci

      # Multiple commands, working directory and own env
      - name: Check formatting
        working-directory: apps/web
        env:
          NODE_ENV: test
        run: |
          npm run lint
          npm test`}</BlogCode>

      <BlogCallout type="warn">
        Each <BlogInlineCode>run</BlogInlineCode> executes in a new, independent
        shell: variables and the directory do not persist between steps. Use{" "}
        <BlogInlineCode>env:</BlogInlineCode> at step or job level to pass
        context, or <BlogInlineCode>actions/upload-artifact</BlogInlineCode> to
        save files between jobs.
      </BlogCallout>

      <BlogH2 id="build-lint-test">Build, lint and test</BlogH2>

      <BlogP>
        The heart of CI for a Node/TypeScript project: install reproducibly,
        compile, check style and run the test suite. Named steps make the
        pipeline readable in the GitHub UI:
      </BlogP>

      <BlogCode>{`jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Typecheck
        run: npm run typecheck

      - name: Lint
        run: npm run lint

      - name: Tests
        run: npm test

      - name: Build
        run: npm run build`}</BlogCode>

      <BlogP>
        <BlogInlineCode>npm ci</BlogInlineCode> installs exactly what{" "}
        <BlogInlineCode>package-lock.json</BlogInlineCode> defines and clears{" "}
        <BlogInlineCode>node_modules</BlogInlineCode> first — it is the
        reproducible choice for CI, unlike <BlogInlineCode>npm install</BlogInlineCode>.
      </BlogP>

      <BlogH2 id="secrets">Secrets</BlogH2>

      <BlogP>
        Never put tokens or passwords in the YAML: they live in Settings →
        Secrets and variables → Actions of the repository and are referenced in
        the workflow. GitHub injects them as environment variables without
        exposing them in the logs:
      </BlogP>

      <BlogCode>{`jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        env:
          VERCEL_TOKEN: \${{ secrets.VERCEL_TOKEN }}
          DATABASE_URL: \${{ secrets.DATABASE_URL }}
        run: |
          npx vercel deploy --prod --token "$VERCEL_TOKEN"
          curl -X POST https://api.myapp.com/deploy`}</BlogCode>

      <BlogCallout type="danger">
        A secret referenced in a step is not visible to the runner unless you
        pass it as an environment variable. And be careful:{" "}
        <BlogInlineCode>{"${{ secrets.API_KEY }}"}</BlogInlineCode> inside a{" "}
        <BlogInlineCode>run:</BlogInlineCode> can end up printed in the logs.
        Pass secrets through <BlogInlineCode>env:</BlogInlineCode> and redact
        the output.
      </BlogCallout>

      <BlogH2 id="caching">Caching dependencies</BlogH2>

      <BlogP>
        Installing dependencies every time takes minutes. The{" "}
        <BlogInlineCode>actions/cache</BlogInlineCode> action restores{" "}
        <BlogInlineCode>node_modules</BlogInlineCode> from a cache whose key is
        derived from the lockfile, and saves it again when it changes:
      </BlogP>

      <BlogCode>{`- uses: actions/cache@v4
  with:
    path: node_modules
    key: \${{ runner.os }}-node-\${{ hashFiles('package-lock.json') }}
    restore-keys: |
      \${{ runner.os }}-node-`}</BlogCode>

      <BlogP>
        The key includes the lockfile hash: if dependencies haven't changed,
        the cache hits. <BlogInlineCode>restore-keys</BlogInlineCode> falls back
        to partial caches when the key misses. setup-node has this built in
        with <BlogInlineCode>cache: npm</BlogInlineCode> for this common case.
      </BlogP>

      <BlogP>
        With pnpm the key point is that dependencies live in{" "}
        <BlogInlineCode>~/.local/share/pnpm/store</BlogInlineCode> and you use{" "}
        <BlogInlineCode>pnpm fetch</BlogInlineCode> to populate the store before
        installing:
      </BlogP>

      <BlogCode>{`- uses: pnpm/action-setup@v4
  with:
    version: 9
- uses: actions/setup-node@v4
  with:
    node-version: 22
    cache: pnpm
- run: pnpm install --frozen-lockfile`}</BlogCode>

      <BlogH2 id="deployment">Deployment</BlogH2>

      <BlogP>
        The final stretch: publish the verified artifact. Depending on the
        target the mechanism changes — a CLI with a token (Vercel), a REST API
        (Render), or a push to the <BlogInlineCode>gh-pages</BlogInlineCode>{" "}
        branch for GitHub Pages:
      </BlogP>

      <BlogCode>{`# Deploy to Vercel only from main
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build

      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: \${{ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}
        run: npx vercel deploy --prod --token "$VERCEL_TOKEN"`}</BlogCode>

      <BlogP>
        Guard the deploy job with a <BlogInlineCode>needs</BlogInlineCode>{" "}
        condition: only deploy once the quality jobs have passed. And in
        repositories with reviewers, the GitHub environment can require human
        approval before the production deploy.
      </BlogP>

      <BlogCallout type="info">
        Separating the <BlogInlineCode>deploy</BlogInlineCode> job with{" "}
        <BlogInlineCode>needs: [quality]</BlogInlineCode> makes the deployment
        explicitly depend on build, lint and tests finishing green. Without that
        dependency, parallel jobs could deploy a broken build.
      </BlogCallout>

      <BlogH2 id="matrices">Matrices</BlogH2>

      <BlogP>
        A matrix runs the same job with different combinations of variables,
        typically to test several Node versions or operating systems. Each
        combination is an independent, parallel job:
      </BlogP>

      <BlogCode>{`jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: npm
      - run: npm ci
      - run: npm test`}</BlogCode>

      <BlogP>
        You can combine dimensions:{" "}
        <BlogInlineCode>os: [ubuntu-latest, macos-latest]</BlogInlineCode> with{" "}
        <BlogInlineCode>node-version: [20, 22]</BlogInlineCode> generates 4
        jobs. For future versions, <BlogInlineCode>include</BlogInlineCode> adds
        extra configurations and <BlogInlineCode>exclude</BlogInlineCode> drops
        combinations you don't want.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="exercises">Exercises</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Create a workflow that runs on every push to main, installs dependencies and runs the tests of a Node.js project."
          hint="Follow the on: push + jobs + steps structure with setup-node and npm ci."
          level="Easy"
          num={1}
          solution={`name: CI
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm test`}
          title="Push workflow with tests"
        />

        <ExerciseCard
          description="Add a second, separate lint job that runs in parallel to the test job."
          hint="Two jobs under the same jobs: root run in parallel by default."
          level="Easy"
          num={2}
          solution={`name: CI
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm test

  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint`}
          title="Separate lint job"
        />

        <ExerciseCard
          description="Add node_modules caching with actions/cache using the lockfile hash as the key, and set up a fallback restore-keys."
          hint="path: node_modules, key with hashFiles('package-lock.json'), restore-keys with an OS prefix."
          level="Intermediate"
          num={3}
          solution={`- uses: actions/cache@v4
  with:
    path: node_modules
    key: \${{ runner.os }}-node-\${{ hashFiles('package-lock.json') }}
    restore-keys: |
      \${{ runner.os }}-node-`}
          title="Dependency caching"
        />

        <ExerciseCard
          description="Deploy the build to GitHub Pages with a deploy job that depends on the test job (needs)."
          hint="Use actions/configure-pages and actions/upload-pages-artifact. The job needs needs: test."
          level="Hard"
          num={4}
          solution={`name: Deploy Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - run: npm ci && npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out
      - id: deployment
        uses: actions/deploy-pages@v4`}
          title="Deploy to GitHub Pages"
        />

        <ExerciseCard
          description="Set up a matrix that runs the tests on Node 18, 20 and 22, and add an extra combination with include that also runs the build on Node 22."
          hint="strategy.matrix.node-version with [18, 20, 22] and include with node-version 22 and build: true."
          level="Hard"
          num={5}
          solution={`name: CI Matrix
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
        include:
          - node-version: 22
            build: true
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
        if: \${{ matrix.build }}`}
          title="Node version matrix"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        With GitHub Actions your repository stops being inert code: every push
        is checked, tested and published reproducibly. The patterns in this
        tutorial — separate jobs, caching, secrets, matrices — are the same
        building blocks used to build pipelines of any complexity.
      </BlogP>
    </article>
  );
}
