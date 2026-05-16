# Library Expansion Status

This document records the current Mindvanta sacred-text expansion boundary. It is operational guidance, not legal advice.

## Current Shipping Boundary

The first-wave expansion is metadata-first. The app ships catalog cards, attribution, course links, search metadata, and Mindvanta-original reflection prompts for the priority texts in `src/core/catalog/texts/phaseOne.ts`.

The app does not bundle unreviewed full translation bodies for these phase-one records. Any full primary text must go through reviewed source cleanup and approval before a reader path is enabled.

## Approved Metadata Candidates

These records can appear on production catalog, course, search, and reflection surfaces because they are approved metadata/guided-study entries:

- `yoga-vasistha`
- `upanishads-paramananda`
- `bhagavad-gita-song-celestial`
- `yoga-sutras-johnston`
- `dhammapada`
- `diamond-sutra`
- `vivekachudamani`
- `ashtavakra-gita`
- `avadhuta-gita`

Public-domain candidates such as Project Gutenberg texts still require cleanup before full-text display. Project Gutenberg wrappers, production credits, trademark/license text, scan artifacts, and non-textual metadata must be removed before a processed text can be reviewed.

## Source-Text-Only And Guided Entries

`ashtavakra-gita` and `avadhuta-gita` are approved only for Mindvanta-original summaries, course references, and reflection prompts until translation reuse is verified. They must not imply a copied translation body is bundled.

Kashmir Shaivism and Tantra entries should remain guided/source-text-first unless a safe translation or reviewed segment pipeline is explicitly approved.

## Sanskrit Rendering Taxonomy

Advanced Sanskrit material now uses three explicit app-facing levels:

- `complete_mindvanta_rendering`: Complete Mindvanta Rendering and Commentary
- `selected_mindvanta_renderings`: Guided Study with Selected Mindvanta Renderings
- `guided_study_map`: Advanced Guided Study Map

These levels are product scope labels, not scholarly claims. They drive badges, search facets, review tests, and reader/review behavior.

## Kramastotra Rendering Project

`kramastotra` is a first-pass Mindvanta Rendering and Commentary project based on the Sanskrit Documents source: `https://sanskritdocuments.org/doc_shiva/kramastotram.html`.

App-facing label:

> Original Mindvanta Rendering and Commentary based on the Sanskrit source text.

The current implementation includes 30 draft verse renderings with Sanskrit source lines, transliteration, literal notes, philosophical commentary, practice notes, reflection questions, key Sanskrit terms, and ambiguity notes. All renderings are `reviewStatus: "draft"` and `productionEligible: false`.

The catalog work itself remains `reviewStatus: "needs_review"` and `licenseStatus: "source_text_only"`. It may be linked from the advanced course `kali-time-and-sequence-of-awareness`, but it must not appear as an approved production library card, production reflection source, official translation, critical edition, or initiatory ritual manual until review is complete.

## Kubjikamatatantra Selected Edition

`kubjikamatatantra` is added as `selected_mindvanta_renderings` with the app label "Guided Study with Selected Mindvanta Renderings."

It contains a conceptual map and selected non-ritual draft renderings around Kubjika, crookedness, Kaula/kula, body as mandala, Shakti, subtle-body symbolism, and sacred power without sensationalism. It is not a complete translation and must not expose ritual procedure or initiatory instructions. The catalog work is `reviewStatus: "needs_review"` and `productionEligible` rendering records remain false.

## Manthanabhairava Guided Study Map

`manthanabhairava-tantra` is added as `guided_study_map` with the app label "Advanced Guided Study Map."

It contains orientation sections for churning, Bhairava/Bhairavi, the Kubjika goddess current, transformation, subtle-body symbolism, hiddenness/initiation, advanced-material warnings, and responsible Mindvanta framing. It does not include selected renderings or a full verse-by-verse translation.

## Review-Gated Entries

`devi-bhagavata-purana` remains review-gated. It may be referenced by internal course modules, but it must not render as a production library card, reflection source, or searchable production text until the 1922 translation source and reuse status are approved.

## Full-Text Ingestion Later

Use `npm run ingest:texts` only to create review-gated processed output from raw files under `content/sacred-texts/raw`. Generated processed files and excerpts default to `needs_review`, and existing processed files are backed up before overwrite.

The next full-text phase should start with one low-risk public-domain candidate, such as `dhammapada`, `yoga-sutras-johnston`, or `upanishads-paramananda`, then add source-specific attribution checks and an approved reader path.
