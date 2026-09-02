# Working on the work site

Read this first. Mason Catt owns this. Senior UX/UI Designer, Windows Design
Systems, Microsoft.

Three hand-written pages, no build step, no dependencies. Open a file and edit
it. Pushing to `main` deploys the repo root to
`https://masoncattdesign.github.io/work/`.

## What this is, and what it is not

This is Mason's work, comprehensively. Expressive Assets is one entry on it.
The two live in separate repos because they had started to read as the same
project when they shared a URL and a navigation bar, and that made a
comprehensive view of his work look like one more page about icons.

So: do not fold this back into the library site, and do not give this site the
library's brand mark or tab row. It carries his initials and its own two tabs.

## House style

- **American spelling.** Color, organize, gray, license, labeled, center.
- **No em-dashes in prose.** Mason has asked for this specifically.
- **Bands are focus levels, not build states.** Focus, Alongside, Opening, then
  the Figma libraries. How finished a thing is belongs in its status chip; how
  much of his attention it has is what the page is actually answering.
- **Cut copy that explains the page to someone already reading it.** The
  headline sentence and standfirst came off for this reason.
- **Say what a thing is, not what it lacks.** The Figma libraries are libraries
  that live in Figma, which is a description rather than a deficiency.
- **Commit messages explain the why**, in full sentences, and name the thing
  that was actually wrong. Sign off with:

      Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>

## Mason pushes, not you

The shell has no GitHub credentials, no `gh`, no SSH key. `git push` fails with
`could not read Username`. Commit freely, then hand him:

    cd ~/Downloads/work && git push origin main

## Things that have bitten, and will again

- **SVG gradient and mask ids are document-global.** Inlining several copies of
  one drawing on a page makes them all paint with the first one's gradients.
  Namespace per copy.
- **A CSS grid with `auto-fit` stretches a lone card across the whole row**, so
  a band with one project in it reads as a banner. Fixed tracks instead.
- **A tint token can vanish against the dark ground.** The part colors at low
  opacity survive both themes; the `-bg` tokens are for filled backgrounds
  behind text, not for artwork.
- **Card thumbnails are drawn, never screenshots.** A screenshot goes stale the
  day the thing changes and has to be recaptured in two themes.
- **Check both themes before calling it done.** Serve the folder and look at
  light and dark; several of the fixes above were only visible in one of them.
