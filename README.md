# work

Mason Catt's work page: everything in flight across Windows Design Systems,
banded by focus rather than by build status.

    https://masoncattdesign.github.io/work/

Three pages, no build step, no dependencies. `index.html` is the work page,
`updates.html` is the running log to send, and `bentos.html` is the BentoOS
icon personalization prototype, which is self-contained and brings its own
chrome. `site.css` and `chrome.js` are shared by the first two.

This is deliberately a separate repo from
[expressive-assets-library](https://github.com/masoncattdesign/expressive-assets-library).
Expressive Assets is one of the things listed here, not the thing this is part
of, and the two had started to read as the same project because they shared a
URL and a navigation bar. The library site links here from the right-hand slot
in its own bar; this site links back out to the library's pages and marks those
links so a click that leaves is not a surprise.

Every page carries `noindex, nofollow`. The content is internal working
material, including open decisions and things still being reviewed.

## Editing

Open the file. There is no toolchain to run and nothing to install.

The pages share a palette and type scale with the library site on purpose, so
the two read as one hand. `site.css` began as that site's document stylesheet
with everything specific to the library documents removed. If a change should
apply to both, it has to be made in both places; that duplication is the price
of the two sites being separable, and it is a small file.

Pushing to `main` deploys. `.github/workflows/pages.yml` uploads the repo root
as the site.
