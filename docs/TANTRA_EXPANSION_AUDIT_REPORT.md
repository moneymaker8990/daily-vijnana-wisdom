# Tantra Expansion Audit Report

## Scope

This audit covers the current advanced Tantra/Sanskrit expansion:

- `kramastotra`
- `kubjikamatatantra`
- `manthanabhairava-tantra`

It verifies the content system as implemented today. It does not approve Sanskrit accuracy or add new texts.

## Production-Safe Now

- The three-level taxonomy is present and tested:
  - Complete Mindvanta Rendering and Commentary
  - Guided Study with Selected Mindvanta Renderings
  - Advanced Guided Study Map
- Advanced Tantra entries remain `licenseStatus: "source_text_only"` and `reviewStatus: "needs_review"`.
- Rendering records remain `reviewStatus: "draft"` and `productionEligible: false`.
- Production Library and Daily Reflection surfaces do not expose these review-gated works.
- Course modules may reference review-gated works as advanced study context.
- The app-facing Kramastotra label now uses the stricter wording:

> Original Mindvanta Rendering and Commentary based on Sanskrit source material. Intended for contemplative study, not as a critical academic edition.

## Issues Found And Fixed

- Replaced the older Kramastotra honesty label with the stricter non-academic edition wording.
- Removed the stale `tripura-rahasya` reflection weight because that catalog work does not exist yet.
- Strengthened advanced course introductions so they read as real study modules rather than thin placeholders.
- Reworded Kramastotra "not included yet" copy to avoid any context-free reading as an official translation claim.
- Added an audit test that prevents placeholder terms, unsafe authority claims, missing advanced source attribution, stale reflection weights, and thin advanced course lessons.
- Added parity tests proving Kubjika and Manthanabhairava stay out of production search/reflection surfaces while course context remains searchable.
- Hardened remaining Tantra copy around ritual shape, source certainty, draft legal status, and templated reflection prose.
- Added shared review/license badge labels and per-rendering review metadata in reader/admin UI.
- Added Manthanabhairava bibliographic source URL metadata and confirmed it remains map-only with no registered verse renderings.

## Remaining Gated Content

These entries must remain gated until human/Sanskrit review:

- `kramastotra`: needs verse alignment, transliteration, Sanskrit accuracy, and non-imitation review.
- `kubjikamatatantra`: needs specialist review for selected passage framing and technical vocabulary.
- `manthanabhairava-tantra`: remains a guided study map only; no verse-level rendering is claimed.

No advanced Tantra content should be marked `approved` or `productionEligible: true` until review is complete.

## UI And Integration Evidence

- Desktop and mobile Library smoke checks confirmed:
  - Library renders.
  - Work Detail renders.
  - Review-gated advanced Tantra works are hidden from the production Library list.
- Server-render smoke checks confirmed:
  - Kramastotra rendering reader shows honesty label, key terms, and navigation.
  - Rendering review admin shows review state and production ineligibility.
- Targeted tests confirm:
  - Review-gated works stay out of production reflection/search/library surfaces.
  - Kubjika selected renderings stay draft-only and production-ineligible.
  - Manthanabhairava has no registered draft or approved rendering records.
  - Course links resolve.
  - Search result content-level facets are present.
  - Reflection weights point only to real catalog works.
  - Rendering UI displays friendly review labels and Sanskrit-review metadata.

## Files Changed In This Audit

- `docs/KRAMASTOTRA_REVIEW_NOTES.md`
- `docs/LIBRARY_EXPANSION_STATUS.md`
- `docs/TANTRA_EXPANSION_AUDIT_REPORT.md`
- `docs/KUBJIKA_AND_MANTHANA_SCOPE.md`
- `docs/SANSKRIT_RENDERING_REVIEW_WORKFLOW.md`
- `src/components/Admin/RenderingReviewAdmin.tsx`
- `src/components/Study/RenderingDetailView.tsx`
- `src/components/Study/MindvantaRenderingReader.tsx`
- `src/components/Study/StudyLibrary.tsx`
- `src/core/catalog/kashmir/kramastotra.ts`
- `src/core/catalog/kashmir/kubjikamatatantra.ts`
- `src/core/catalog/kashmir/manthanabhairava.ts`
- `src/core/catalog/reviewStatusLabels.ts`
- `src/core/reflections/catalogReflections.ts`
- `src/core/study/courses/themed/libraryExpansion.ts`
- `tests/catalog/kubjikaRendering.test.ts`
- `tests/catalog/manthanabhairavaStudyMap.test.ts`
- `tests/catalog/kramastotraRendering.test.ts`
- `tests/catalog/tantraExpansionAudit.test.ts`
- `tests/components/renderingReviewUi.test.tsx`
- `tests/reflections/catalogReflections.test.ts`
- `tests/search/catalogSearch.test.ts`

## Recommended Next Phase

Do not add more advanced Tantra maps yet. The next content expansion should be the Kashmir Shaivism Core Expansion:

1. Shiva Sutras
2. Spanda Karikas
3. Pratyabhijna Hridayam

Those should be implemented as original Mindvanta renderings/commentaries only after the current gated system remains stable through review.
