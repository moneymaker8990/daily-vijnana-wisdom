/**
 * Entering Nondual Tantra — Kashmir Shaivism / Trika guided path
 *
 * Five curriculum layers (order in `lessons`):
 * 1. Intro Core — frames and vocabulary
 * 2. Recognition Layer — Pratyabhijñā arc and stable works
 * 3. Practice Layer — upāyas, Spanda, embodiment, VBT
 * 4. Commentary Layer — why commentaries exist; honest bibliography
 * 5. Advanced Tantric Synthesis — encyclopedic / tantra shell works + thematic integration
 *
 * Work pages in the Sacred Library Nondual shelf use stable slugs (e.g. shiva-sutras, tantraloka).
 */

import type { Course } from '@core/study/types';

export const kashmirShaivismCourse: Course = {
  id: 'kashmir-shaivism',
  title: 'Entering Nondual Tantra',
  description:
    'A five-layer guided path through nondual Śaiva Tantra (Kashmir Shaivism / Trika): (1) Intro Core, (2) Recognition, (3) Practice, (4) Commentary literacy, (5) Advanced tantric synthesis. Each layer links to **TextWork** pages on the Nondual shelf—showing what the app includes, what is bibliography-only, and what ships as guided study.',
  icon: '🔱',
  pathwayType: 'tradition',
  difficulty: 3,
  estimatedWeeks: 6,
  lessons: [
    {
      id: 'ks-layer-intro-core',
      title: 'Layer 1 — Intro Core (orientation)',
      introduction: `This layer sets **tone and honesty**. Kashmir Shaivism in Mindvanta is not a costume drama; it is a family of contemplative maps that treat awareness and its dynamism (śakti) as central.

Use the **Nondual Tantra** shelf to open canonical work pages. Each page lists what is *included* in-app vs *not included yet*, plus bibliography. Quick map of slugs you will see repeated:

• \`shiva-sutras\` — full sūtra reader  
• \`spanda-karika\`, \`pratyabhijna-hridayam\`, \`vijnana-bhairava-tantra\` — primary or digest readers (see each card’s availability label)  
• \`tantraloka\`, \`paramarthasara\` — excerpts / guided thematic entries  
• \`isvara-pratyabhijna-karika\`, \`isvara-pratyabhijna-vimarshini\`, \`malinivijayottara-tantra\`, \`netra-tantra\`, \`shiva-sutra-commentary-tradition\` — bibliography + in-app guides until a cleared **TextVersion** exists

The next lessons sharpen language and expectations before you dive into practice texts.`,
      verses: [],
      reflectionQuestions: [
        'Which shelf labels (Root Text, Digest, Excerpt, Guided Study, Bibliographic) do you need to remember so you treat this app as a map, not a complete library?',
        'What would “honest depth” look like for you this month—inside the app and beside it?',
      ],
      practice: {
        title: 'Open two work pages',
        duration: '12 minutes',
        instructions: [
          'Open the Sacred Library → Nondual Tantra shelf.',
          'Read one **Root Text** work page and one **Bibliographic Entry Only** page end-to-end.',
          'Note one “included” line and one “not included yet” line that shifts your expectations.',
        ],
      },
    },
    {
      id: 'ks-1',
      title: 'What Tantra Actually Means',
      introduction: `In this app, “tantra” does not mean pop-culture sexual tantra or vague mystique. This section focuses on **nondual Śaiva Tantra**, especially the Kashmir (Trika) streams that treat awareness and its dynamic power as central.

Tantra here names a family of contemplative methods and philosophies that take **direct experience** seriously: breath, sound, body, emotion, sleep, and attention are not distractions from the sacred—they are places where recognition can happen.

Your aim in this path is neither belief nor performance. It is **clearer perception**: noticing the field of awareness in which thoughts, sensations, and world-appearance already occur.`,
      verses: [],
      reflectionQuestions: [
        'What misconceptions about “tantra” have you picked up from culture or media?',
        'What would it mean to treat spiritual life as honest experiment rather than identity?',
        'What draws you toward a path that honors both stillness and embodied life?',
      ],
      practice: {
        title: 'Clarify your intention',
        duration: '10 minutes',
        instructions: [
          'Sit comfortably. Feel the breath and the contact of the body with the floor or chair.',
          'Silently note: “I am here to look carefully, not to impress anyone.”',
          'Recall one idea from this introduction that feels grounding.',
          'Rest for a few minutes without forcing a special state.',
        ],
      },
    },
    {
      id: 'ks-study-map',
      title: 'Study map: catalog, tiers, and depth',
      introduction: `The **Nondual Tantra** shelf is driven by the **TextWork** catalog (Phase 1). Card badges are the honest primary label for what ships:

• **Root Text** — Primary segments approved for the reader (e.g. \`shiva-sutras\`, \`spanda-karika\`, \`vijnana-bhairava-tantra\`—verify each work page).  
• **Digest / Summary** — Condensed system text (e.g. \`pratyabhijna-hridayam\`) vs the full Pratyabhijñā treatise.  
• **Excerpt** — Curated tastings (e.g. \`tantraloka\`), not the whole encyclopedia.  
• **Guided Study** — Original in-app pathways (e.g. \`paramarthasara\` thematic notes).  
• **Bibliographic Entry Only** — Metadata + study guide + relationships; no approved primary reader bundle (e.g. \`isvara-pratyabhijna-karika\`, \`malinivijayottara-tantra\`).

**Commentary** as a badge is reserved for when a commentary **TextVersion** is explicitly approved—many commentary traditions are cited on work pages long before that.

Progression in this course mirrors serious study: **orientation → recognition → embodied practice → commentary literacy → encyclopedic / tantric shells and synthesis.**`,
      verses: [],
      reflectionQuestions: [
        'Which availability label do you most need to remember so you don’t mistake highlights for the whole tradition?',
        'Where would you turn outside the app when you are ready for commentary or full *Tantrāloka* study?',
        'What would “depth” mean for you personally—intellectual clarity, stable practice, or both?',
      ],
      practice: {
        title: 'Inventory your expectations',
        duration: '10 minutes',
        instructions: [
          'On the Nondual shelf, filter by two different availability modes.',
          'Open a work detail page; read **Included** / **Not included yet** aloud once.',
          'Write one sentence: “I am using this app to…” without judging the answer.',
        ],
      },
    },
    {
      id: 'ks-2',
      title: 'Śiva and Śakti',
      introduction: `**Śiva** names pure awareness—the open, knowing field in which everything appears. **Śakti** names its living dynamism: energy, creativity, attention’s movement, the pulse of experience.

Nondual Shaiva traditions refuse a harsh split between “spirit” and “world.” The body and the cosmos are understood as **expression**, not as a prison to escape. Practice is not mainly about becoming pure in a moralistic sense; it is about **recognition** of what is already true prior to struggle.

The Vijñāna Bhairava opens in the voice of the Goddess asking precise questions—because awakening here is relational and intimate, not cold theory.`,
      verses: ['vbt-1', 'ss-1-1', 'ss-1-19', 'pratyabhijna-1', 'spanda-1', 'paramarthasara-5'],
      reflectionQuestions: [
        'When you hear “Śiva,” can you translate it experimentally as “the fact of being aware” rather than a distant deity only?',
        'Where do you feel śakti most plainly today—as aliveness, emotion, curiosity, or pressure?',
        'What changes when the world is met as expression rather than only as threat or temptation?',
      ],
      practice: {
        title: 'Rest as the field',
        duration: '12 minutes',
        instructions: [
          'Sit quietly. Let sounds, sensations, and thoughts arise and pass.',
          'Every few breaths, silently ask: “What is aware of this?”',
          'Do not demand an answer; notice the simplicity before the story.',
          'End by feeling that listening includes both stillness and movement.',
        ],
      },
    },
    {
      id: 'ks-layer-recognition',
      title: 'Layer 2 — Recognition (Pratyabhijñā arc)',
      introduction: `**Recognition** (*pratyabhijñā*) claims bondage is largely contraction and forgetting—not a permanent stain on awareness. This layer weaves the Śiva Sūtra’s terse pointers with digest and bibliography entries you must not confuse for the full *Īśvara Pratyabhijñā* treatise.

Work slugs to keep in sight:

• \`shiva-sutras\`, \`pratyabhijna-hridayam\` — readers in-app (see availability)  
• \`isvara-pratyabhijna-karika\`, \`isvara-pratyabhijna-vimarshini\` — guided + bibliographic until a shipped kārikā/commentary version is approved  

Let the **Hṛdayam** train vocabulary; let the IPK/Vimarśinī pages train **humility about what serious Recognition study demands** off-app.`,
      verses: [],
      reflectionQuestions: [
        'Where do you feel most separate from life when stressed?',
        'What would falsify your idea of “recognition”—i.e., how would you know you were bypassing vs clarifying?',
      ],
      practice: {
        title: 'Pair digest with bibliography',
        duration: '15 minutes',
        instructions: [
          'Open \`pratyabhijna-hridayam\` and read its included/overview lines.',
          'Open \`isvara-pratyabhijna-karika\` and read **Not included yet** once slowly.',
          'Journal one sentence on what “digest vs treatise” means for your next year of reading.',
        ],
      },
    },
    {
      id: 'ks-5',
      title: 'Recognition: You Are Not Separate',
      introduction: `**Pratyabhijñā** (recognition) teaches that bondage is largely **contraction and forgetting**—not a permanent stain. What you are is not a tiny object cut off from reality.

This app’s *Pratyabhijñāhṛdayam* is a **digest**—twenty memorable sūtras. The systematic “Recognition” treatise in history is Utpaladeva’s *Īśvara Pratyabhijñā* kārikās with Abhinavagupta’s *Vimarśinī* commentary; that pair is the intellectual backbone many scholars compare to the densest Western philosophy—and it is **named honestly** on its work pages, not pasted into the reader without a cleared **TextVersion**.

The Śiva Sūtras are similarly compressed; Kṣemarāja’s *Vimarśinī* commentary on them is named under \`shiva-sutra-commentary-tradition\`.

Liberation here is remembering the **whole field**. Thoughts and feelings can still arise; what changes is the felt truth of their context.

This is not arrogance (“I am God” as slogan) but humility: seeing through the brittle story of separation.`,
      verses: ['pratyabhijna-2', 'pratyabhijna-6', 'pratyabhijna-11', 'pratyabhijna-13', 'pratyabhijna-17', 'ss-1-14'],
      reflectionQuestions: [
        'Where do you feel most separate from life when stressed?',
        'What helps you remember a wider context without bypassing pain?',
        'How is recognition different from positive self-talk?',
      ],
      practice: {
        title: 'Widen around a contraction',
        duration: '15 minutes',
        instructions: [
          'Recall a recent moment of stress or defensiveness.',
          'Sense where it lives in the body.',
          'Ask softly: “What knows this?” and let attention include both tightness and space.',
          'Rest without forcing the contraction to disappear.',
        ],
      },
    },
    {
      id: 'ks-layer-practice',
      title: 'Layer 3 — Practice (means, pulse, embodiment)',
      introduction: `Classical Kashmir pedagogy is not “only philosophy.” This layer moves through **three upāyas** (modes of means), **Spanda** (the pulse of consciousness), **embodied gateways**, and the **Vijñāna Bhairava** as a practice laboratory.

Reader-linked slugs preview: \`shiva-sutras\` (upāya structure), \`spanda-karika\`, \`vijnana-bhairava-tantra\`. Use practice sections to **test** maps, not to collect techniques as trophies.`,
      verses: [],
      reflectionQuestions: [
        'Which upāya—direct, śakti-luminous, or embodied—do you tend to skip because it embarrasses or bores you?',
        'How will you know a technique is integrating rather than dissociating?',
      ],
      practice: {
        title: 'Name one practice-only week',
        duration: '8 minutes',
        instructions: [
          'Pick one work page you can open in the reader this week (\`vijnana-bhairava-tantra\` is a common choice).',
          'Commit to a small daily dose (five to fifteen minutes) before adding new texts.',
        ],
      },
    },
    {
      id: 'ks-4',
      title: 'The Three Upāyas',
      introduction: `The Shiva Sutras are structured around **three modes of practice** (upāyas)—not random chapters:

• **Śāmbhavopāya** — Direct resting in awareness: recognition-first.
• **Śāktopāya** — The path of śakti: mantra, refined thought, luminous attention.
• **Āṇavopāya** — Embodied means: breath, body, method—helpful when the mind needs structure.

These are **different skills**, not ranks of worth. Most people use more than one over a lifetime.`,
      verses: ['ss-1-1', 'ss-2-1', 'ss-3-22', 'ss-3-8'],
      reflectionQuestions: [
        'Which upāya sounds most natural to you right now—direct, mantra/attention, or embodied?',
        'When does “direct” practice become subtle avoidance of feeling?',
        'When does method become a substitute for honesty?',
      ],
      practice: {
        title: 'Name your current means',
        duration: '12 minutes',
        instructions: [
          'Read the three upāyas slowly once.',
          'Choose one to emphasize for the next twenty-four hours.',
          'For śāmbhava: pause three times and ask “What knows this?”',
          'For śākta: use one minute of silent mantra or listening attention.',
          'For āṇava: follow ten conscious breaths before one routine task.',
        ],
      },
    },
    {
      id: 'ks-6',
      title: 'Spanda: The Pulse of Consciousness',
      introduction: `**Spanda** is the subtle **pulse** of consciousness—not a theatrical vibration, but the living fact that awareness is never dead. Stillness and movement interweave.

This app contains the **full fifty-three** Spanda kārikās (GRETIL) with English close readings—use them to feel the **gap between thoughts**, emotion as revelation, and freedom **in** activity rather than only away from it.`,
      verses: ['spanda-2', 'spanda-4', 'spanda-5', 'spanda-11', 'spanda-24', 'spanda-32', 'spanda-41', 'spanda-53'],
      reflectionQuestions: [
        'Can you sense a quiet aliveness beneath mental chatter?',
        'How is this different from anxious agitation?',
        'Where does stillness feel alive rather than numb?',
      ],
      practice: {
        title: 'Feel the inner pulse',
        duration: '15 minutes',
        instructions: [
          'Sit upright, hands resting loosely.',
          'Notice heartbeat, breath, or subtle tingling without hunting intensity.',
          'Let the focus be “alive stillness” rather than a blank void.',
          'For the last minutes, carry ordinary hearing without commentary.',
        ],
      },
    },
    {
      id: 'ks-3',
      title: 'Awareness, Energy, and the Body',
      introduction: `Kashmir Shaivism is sometimes called “idealist” in academic language, but practitioners experience it as **embodied**: awareness is not trapped behind the eyes; it saturates sensation.

Energy (śakti) is not a belief about “vibes.” It is the palpable **aliveness** of attention—warmth, vibration, emotional color, the hum beneath thought. The body becomes a **tuning instrument**, not an enemy.

The Vijñāna Bhairava repeatedly turns ordinary moments (taste, touch, fatigue, space) into contemplative doorways. That practicality is the tradition’s generosity.`,
      verses: ['vbt-27', 'vbt-48', 'vbt-6', 'tantraloka-4', 'tantraloka-16', 'spanda-5', 'paramarthasara-13'],
      reflectionQuestions: [
        'Where do you habitually treat the body as an obstacle rather than a place of knowing?',
        'What happens when you feel sensation without immediately explaining it?',
        'Can aliveness be known without exaggeration or drama?',
      ],
      practice: {
        title: 'Sensation as doorway',
        duration: '15 minutes',
        instructions: [
          'Choose one neutral sensation (hands, feet, or breath).',
          'For five minutes, feel texture, temperature, and subtle vibration.',
          'When the mind labels, return to raw sensation.',
          'Close by noticing that awareness and aliveness were never separate.',
        ],
      },
    },
    {
      id: 'ks-7',
      title: 'Practice from the Vijñāna Bhairava',
      introduction: `The **Vijñāna Bhairava** is this library’s flagship practice text: 112 experiments in attention. Categories (breath, sound, body, etc.) help you browse by **how** you want to work today.

Pick **one** technique and stay with it for a season. The text rewards repetition and sincerity more than quantity.`,
      verses: ['vbt-2', 'vbt-9', 'vbt-45', 'vbt-72', 'vbt-112', 'paramarthasara-4'],
      reflectionQuestions: [
        'Which category of practice fits your temperament this week?',
        'What is the smallest daily dose of practice you can actually keep?',
        'How will you know if a technique is clarifying rather than dissociating?',
      ],
      practice: {
        title: 'Choose one gateway',
        duration: '20 minutes',
        instructions: [
          'Open \`vijnana-bhairava-tantra\` from the Nondual shelf.',
          'Choose one verse that confuses you slightly—in a good way.',
          'Try it gently for fifteen minutes without optimizing.',
          'Journal three sentences about what happened, without judging “success.”',
        ],
      },
    },
    {
      id: 'ks-layer-commentary',
      title: 'Layer 4 — Commentary literacy',
      introduction: `Great śāstra cultures are **commentarial**. Aphorisms invite mischief when read without the ethical and intellectual habits commentary trains. This layer names that hunger honestly—without pretending Mindvanta currently ships every running commentary.

Priority slugs:

• \`shiva-sutra-commentary-tradition\` — why *Vimarśinī*-class reading matters  
• \`isvara-pratyabhijna-vimarshini\` — advanced bibliographic + study guide  

Your task: learn **how** to read with teachers and licensed editions off-app, and use in-app pages to track what is not yet bundled.`,
      verses: [],
      reflectionQuestions: [
        'What confusion in you actually requires commentary, vs what requires therapy, rest, or ethics?',
        'How will you avoid using “advanced Sanskrit words” as performance?',
      ],
      practice: {
        title: 'Commentary shelf without scrolling translations',
        duration: '12 minutes',
        instructions: [
          'Open \`shiva-sutra-commentary-tradition\`; read guided path steps.',
          'Write one technical term you will research in a print glossary this month.',
        ],
      },
    },
    {
      id: 'ks-commentary-craft',
      title: 'How to read commentaries (without pirating depth)',
      introduction: `Commentaries do three things at once: stabilize **definitions**, walk through **arguments**, and suggest **practice cross-checks**. None of that is served by screenshot-hunting dubious PDFs.

Use Mindvanta work pages to see **license posture** and **approved surfaces**. When a commentary is bibliographic-only, treat the app as a **concierge to legitimate study**: editions, teachers, and pacing—not a shadow library.

Return to the Śiva Sūtra reader (\`shiva-sutras\`) with one sūtra you genuinely do not understand; carry that humility into commentary-focused reading off-app.`,
      verses: ['ss-1-11', 'ss-2-7', 'pratyabhijna-1'],
      reflectionQuestions: [
        'What is one question a commentary could answer for you that meditation alone has not?',
        'Where do you feel resistance to slow, repetitive reading?',
      ],
      practice: {
        title: 'Ten minutes, one gloss',
        duration: '10 minutes',
        instructions: [
          'Pick one verse above; speak it once.',
          'Imagine a teacher offering a single definition only—no debate.',
          'Sit five minutes without rehearsing more words.',
        ],
      },
    },
    {
      id: 'ks-layer-advanced',
      title: 'Layer 5 — Advanced tantric synthesis (encyclopedic & scriptural shells)',
      introduction: `The tradition’s later layers are **big**: encyclopedic compendia (*Tantrāloka*), ritual-heavy tantras (*Mālinīvijayottara*, *Netra*), and essences (*Paramārthasāra*). Mindvanta names these works on the shelf so your mental bibliography matches scholars and practitioners.

Anchor slugs:

• \`tantraloka\` — excerpt reader + long-range honesty  
• \`malinivijayottara-tantra\`, \`netra-tantra\` — bibliographic shells + guides  
• \`paramarthasara\` — guided thematic series (not a claimed full critical edition)

Phase 2 may introduce **chapter loaders** (see \`docs/LARGE_TEXT_SEGMENT_ARCHITECTURE.md\`) when a version warrants it.`,
      verses: [],
      reflectionQuestions: [
        'Where do you still split “spiritual” from “ordinary” in a way that exhausts you?',
        'What safeguards—ethical, communal, legal—do large tantric literatures demand?',
      ],
      practice: {
        title: 'Map one “shell” work',
        duration: '12 minutes',
        instructions: [
          'Open \`malinivijayottara-tantra\` or \`netra-tantra\`.',
          'List two ideas you already met in Spanda or VBT that this work likely amplifies.',
          'Note one reason the app keeps the text off the primary reader for now.',
        ],
      },
    },
    {
      id: 'ks-8',
      title: 'Tantrāloka & Paramārthasāra threads',
      introduction: `**Tantrāloka** (Abhinavagupta) is encyclopedic—commonly on the order of **five to six thousand verses** in **thirty-seven chapters** in cited editions. This app carries **selections only** on \`tantraloka\`: enough to taste how ritual, mantra, body, and recognition stay one conversation. For the full work you will need external editions, teachers, and time—and eventually architecture for chapter-scoped loading.

**Paramārthasāra** (\`paramarthasara\`) appears as **short educational themes**, not a verse-by-verse scholarly alignment. Traditional recensions are often near **one hundred** ślokas; compare any published translation when you go deeper.

Both streams insist: nonduality is not an idea that cancels life—it is a way of meeting life with fewer unnecessary splits.`,
      verses: ['tantraloka-1', 'tantraloka-10', 'tantraloka-25', 'tantraloka-40', 'paramarthasara-1', 'paramarthasara-17', 'paramarthasara-33', 'paramarthasara-62'],
      reflectionQuestions: [
        'Where do you still split “spiritual” from “ordinary” in a way that exhausts you?',
        'What is one practice form (breath, sound, gesture, ethics) that could become more sincere this week?',
        'How will you avoid turning these maps into new arrogance?',
      ],
      practice: {
        title: 'Read one selection aloud, then sit',
        duration: '18 minutes',
        instructions: [
          'Open \`tantraloka\` or \`paramarthasara\` from the Library.',
          'Read one passage slowly aloud or under your breath.',
          'Sit eight minutes without analyzing: let the tone of the words reverberate.',
          'Close with one sentence you could say kindly to yourself.',
        ],
      },
    },
    {
      id: 'ks-layer-synthesis',
      title: 'Synthesis — carrying the whole map lightly',
      introduction: `You now have **five layers** under your feet: intro honesty, recognition, practice, commentary literacy, and advanced shells. The point is not to “complete” Kashmir Shaivism inside one screen—it is to **stop lying to yourself** about what a highlight is.

Return periodically to the catalog labels. When you add off-app reading, tie it back to **work slugs** so your notes stay organized (\`spanda-karika\`, \`pratyabhijna-hridayam\`, \`tantraloka\`, …).

If you teach or speak publicly, reproduce **Mindvanta’s availability language** so beginners are not misled about excerpted or guided material.`,
      verses: ['paramarthasara-5', 'paramarthasara-33', 'spanda-53', 'ss-1-1'],
      reflectionQuestions: [
        'What one practice and one book off-app will you actually sustain for ninety days?',
        'Who in your life reflects ethical maturity—not just metaphysical excitement?',
      ],
      practice: {
        title: 'Quarterly review',
        duration: '20 minutes',
        instructions: [
          'Skim your bookmarks across two traditions or two works maximum.',
          'Rewrite your study plan in five bullet points; delete three ambitions that were performance.',
          'End with five minutes of śāmbhava-style resting: wide attention, soft breath.',
        ],
      },
    },
  ],
};
