# Kashmir Shaiva texts: ingestion spike (future work)

This note records **decisions to make** before adding Śiva Sūtra *Vimarśinī*, Īśvara Pratyabhijñā (kārikā + *Vimarśinī*), full *Tantrāloka*, Mālinīvijayottara, or *Netra Tantra* to the app.

## 1. Licensing and attribution

- **English translations** of Abhinavagupta and Utpaladeva are often under copyright. Ship only texts you have rights to (commissioned translation, cleared license, or public domain with verified status).
- **Sanskrit** may be available via [GRETIL](https://gretil.sub.uni-goettingen.de/) or similar; comply with each file’s stated license (the app already cites CC BY-NC-SA for some GRETIL-derived entries).
- **App-original commentary** remains your own editorial layer; keep distinguishing *source line* vs *educational note* (`VerseContentKind`).

## 2. Storage and delivery shape

| Work | Scale (order of magnitude) | Suggested pattern |
|------|---------------------------|-------------------|
| Śiva Sūtra + *Vimarśinī* | Single book, ~77 base + commentary chunks | New `sourceId`; link commentary `Verse` rows to `shiva-sutras` ids via tags or a future `relatedVerseId` field. |
| IPK + *Vimarśinī* | Large kārikā + prose | Chunk by kārikā; commentary as adjacent entries or nested display in reader. |
| Full *Tantrāloka* | ~37 āhnikas, ~5.8k+ verses | **Do not** load one giant flat array in the client. Prefer lazy chapter modules, route-level code split, or server-backed fetch per chapter. See `docs/LARGE_TEXT_SEGMENT_ARCHITECTURE.md` for Phase 1 TypeScript stubs (`ChapterLoader`, search index shapes). |
| Mālinīvijayottara / *Netra* | Major tantras | Same as above: chapter or section boundaries; search/index separate from initial bundle. |

## 3. Editorial baseline

- Pick **one** Sanskrit edition (or one translation line) as reference per work; document it in `Source.translator` / `historicalIntro` so users know which recension you follow.
- For *Tantrāloka*, verse counts and chapter breaks vary by edition; keep `canonicalVerseTotal` and copy **approximate** unless you align to a single printed edition everywhere.

## 4. Verification before shipping any new source

- Wire into `ALL_VERSES` and `ALL_SOURCES`, `getVerseCount`, and (if applicable) `LibraryText` adapter.
- Set `contentTier`: `rootText`, `excerpt`, `summaryOrDigest`, `educationalSeries`, or `commentary`.
- Run the project typecheck and smoke-test Study Library cards + `TextReader` headers for correct scope lines.
