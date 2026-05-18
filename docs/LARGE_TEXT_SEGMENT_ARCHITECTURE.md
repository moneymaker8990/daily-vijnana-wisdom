# Large texts: segment architecture

Phase 1 does **not** load works like the full *Tantrāloka* into a single client bundle. Canonical catalog rows describe what is honest to ship.

Phase 2 now has the app-side reader boundary for lazy loading: approved catalog versions can render through `SegmentReader`, which loads chapter slices from Supabase `catalog_text_segment` rows visible through RLS. Existing small and medium sources continue to use the legacy `Verse[]` reader unless a catalog work explicitly opts into the segment reader.

## Source of truth in code

Types and reader primitives live in `src/core/catalog/largeWorkArchitecture.ts`:

- **`ChapterRef`**, **`ChapterLoader`** — resolve content by work + chapter (or āhnika) without assuming `LibraryText.verses` holds the entire work.
- **`ChapterLoadResult`** — represents ready, empty, and error states for a lazy chapter load.
- **`LargeWorkManifest`**, **`WorkSearchIndex`**, **`SegmentCache`** — future manifest/search/cache work after the first approved segment-reader pilot.

## Relationship to the verse engine today

- Small and medium sources continue to use `Verse[]` + `TextReader` as today.
- For Kashmir, `TextWork.slug` and `legacy_registry_source_id` link catalog honesty to existing registries; see `src/core/catalog/kashmir/works.ts`.
- `TextWork.preferred_reader: 'segment'` is the explicit Phase 2 switch for a work that should open approved Supabase segments before its legacy bundle.
- If `preferred_reader` is not set, legacy-backed works stay on `TextReader`; non-legacy works with approved `segment_reader` surfaces use `SegmentReader`.

## Ingestion alignment

See also `docs/KASHMIR_FUTURE_TEXTS_INGESTION.md` for licensing and editorial gates. Before enabling `preferred_reader: 'segment'` on a real work, confirm that the backing **`TextVersion`** has `approved_for_shipping: true`, includes `segment_reader` in `approved_surfaces`, and has approved `catalog_text_segment` rows visible through Supabase RLS.

The reader still calls **`LicenseGuard`** (`assertApprovedForSurface`) before rendering primary `source_text` / `translation`. Do not use `preferred_reader` to bypass version approval, legal review, or RLS visibility.
