# Sanskrit Rendering Review Workflow

This workflow governs advanced Sanskrit and Tantra material in Mindvanta. It is a product-safety and review process, not legal advice or scholarly certification.

## Content Levels

- `complete_mindvanta_rendering`: every verse in a short work has a Mindvanta rendering, commentary, practice note, and reflection prompt. Current template: `kramastotra`.
- `selected_mindvanta_renderings`: only selected non-ritual passages or conceptual anchors receive Mindvanta renderings. Current template: `kubjikamatatantra`.
- `guided_study_map`: no verse-level rendering is claimed. The entry gives orientation, concepts, and responsible study paths. Current template: `manthanabhairava-tantra`.

## Production Gate

A rendering can appear on public production reader surfaces only when all of these are true:

- `rendering.reviewStatus === "approved"`
- `rendering.productionEligible === true`
- the catalog work exists
- the catalog work is not `licenseStatus: "do_not_import"`
- the catalog work is `reviewStatus: "approved"`
- attribution or source metadata exists

The helper `canShowRenderingInProduction(rendering)` enforces this. Draft records remain available to internal/admin preview helpers through `getDraftRenderingsForWork(slug)`.

## Review Steps

1. Confirm the app-facing content level matches actual coverage.
2. Confirm no entry claims to be an official scholarly translation.
3. Confirm source attribution and bibliographic notes are present.
4. Check Sanskrit terms for consistency and decide which terms should remain untranslated.
5. Check commentary tone: precise, contemplative, non-sensational, and not imitating a living translator.
6. Remove any ritual procedure, initiation instructions, or lineage-restricted material.
7. Add `reviewNotes`, `reviewerName`, `reviewedAt`, and `needsSanskritReview` where relevant.
8. Move records to `needs_review` only after editorial pass.
9. Move records to `approved` only after human review; Sanskrit/Tantra review is required for production eligibility.

## What Mindvanta Is Not Claiming

Mindvanta renderings are original study material. They are not critical editions, official translations, lineage authorization, ritual manuals, or replacements for teachers and scholarship.
