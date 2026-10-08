#!/usr/bin/env bash
# Build the Bestday quiz with live settings and drop it into the website's public/quiz.
# Usage: ship-quiz.sh <path-to-bestday_quiz> <path-to-bestday-ai-landing-page>
set -euo pipefail

quiz="${1:?path to bestday_quiz}"
site="${2:?path to bestday-ai-landing-page}"

# The quiz's Mixpanel project ("Bestday Quiz", 4068985). Builds without a token ship with analytics
# switched off, which is how the quiz ran untracked from launch until October 2026.
: "${PUBLIC_MIXPANEL_TOKEN:?set PUBLIC_MIXPANEL_TOKEN to the Bestday Quiz project token (Mixpanel > Project settings)}"

cd "$quiz"
[ -d node_modules ] || npm install
ASTRO_TELEMETRY_DISABLED=1 npx astro check

QUIZ_BASE_PATH=/quiz \
PUBLIC_QUIZ_NOINDEX=true \
PUBLIC_MIXPANEL_TOKEN="$PUBLIC_MIXPANEL_TOKEN" \
PUBLIC_CAPTURE_ENDPOINT=https://quiz-capture.invalid/endpoint \
PUBLIC_SITE_ORIGIN=https://bestday.ai \
ASTRO_TELEMETRY_DISABLED=1 \
npx astro build

# Some tests read the built dist/ (including the email previews), so they run after the build
# and before the previews are deleted.
npm test

# Internal previews never ship.
rm -rf dist/email dist/assets/review

rm -rf "$site/public/quiz"
mkdir -p "$site/public/quiz"
cp -R dist/. "$site/public/quiz/"

cd "$site"
node scripts/apply-quiz-overrides.mjs

echo
echo "App links in the shipped quiz:"
grep -rhoE 'https://getbestdayapp\.app\.link/[a-z0-9]+' public/quiz | sort | uniq -c || true
if grep -rlE 'apps\.apple\.com|play\.google\.com' public/quiz >/dev/null; then
  echo "WARNING: store URLs found in public/quiz" >&2
  exit 1
fi
if ! grep -rqF "$PUBLIC_MIXPANEL_TOKEN" public/quiz; then
  echo "ERROR: the Mixpanel token is missing from public/quiz" >&2
  exit 1
fi
echo "Mixpanel token: present"
echo "Quiz source commit: $(git -C "$quiz" rev-parse --short HEAD)"
