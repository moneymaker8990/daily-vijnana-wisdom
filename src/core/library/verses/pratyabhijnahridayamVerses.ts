/**
 * Pratyabhijñāhṛdayam (Kṣemarāja) — twenty sūtras: Sanskrit (GRETIL) + English close reading
 *
 * Sanskrit: GRETIL sa_kSemarAja-pratyabhijJAhRdaya (CC BY-NC-SA 4.0).
 * English in `plainLanguage`: original close reading composed from the Sanskrit for readability
 * `translationReaderNote` (where present): honesty/range/takeaway for dense sūtras—one short paragraph per field.
 */

import type { Verse, TranslationReaderNote } from '../types';

const SRC =
  'Sanskrit: GRETIL sa_kSemarAja-pratyabhijJAhRdaya (Kṣemarāja: Pratyabhijñāhṛdayam). Licence: CC BY-NC-SA 4.0.';

function ph(
  n: number,
  text: string,
  plainLanguage: string,
  extras?: { tags?: string[]; translationReaderNote?: TranslationReaderNote }
): Verse {
  const tags = extras?.tags ?? ['recognition', 'pratyabhijna', 'kashmir', 'sanskrit'];
  return {
    id: `pratyabhijna-${n}`,
    sourceId: 'pratyabhijnahridayam',
    sourceName: 'Pratyabhijñāhṛdayam',
    tradition: 'Tantric',
    chapter: 1,
    verseNumber: n,
    text,
    plainLanguage,
    translator: SRC,
    tags,
    contentKind: 'source_text',
    translationReaderNote: extras?.translationReaderNote,
  };
}

export const pratyabhijnahridayamVerses: Verse[] = [
  ph(1, 'citiḥ svatantrā viśvasiddhihetuḥ', 'Consciousness (citi), free, is the cause of the world’s accomplishment.'),
  ph(
    2,
    'svecchayā svabhittau viśvam unmīlayati',
    'By its own will, on its own ground-screen, it displays the universe.'
  ),
  ph(
    3,
    'tan nānā anurūpagrāhyagrāhakabhedāt',
    'That [appears] as manifold from the division of appropriate grasped and grasper.'
  ),
  ph(
    4,
    'citisaṃkocātmā cetano \'pi saṃkucitaviśvamayaḥ',
    'Though conscious and of the nature of consciousness’s contraction, [it is] made of the contracted universe.'
  ),
  ph(
    5,
    'citir eva cetanapadād avarūḍhā cetyasaṃkucinī cittam',
    'Consciousness itself, descended from the plane of the conscious, contracting into “this”—that is citta (mind).'
  ),
  ph(6, 'tanmayo māyāpramātā', '[He is] one with that—the limited knower (māyā-pramātā).'),
  ph(
    7,
    'sa caiko dvirūpas trimayaś caturātmā saptapañcakasvabhāvaḥ',
    'And that one [is] twofold-formed, threefold, fourfold in self, of the nature of seven and five [groups].',
    {
      translationReaderNote: {
        tightVsLoose:
          'The numeral clusters (two, three, four, seven-and-five) are formulaic shorthand in the school; listing them in English is accurate as far as it goes, but «of the nature of» imports a metaphysical claim not spelled out in the single line.',
        alternatives:
          'Commentaries unpack dvirūpa / trimaya / caturātman and sapta-pañcaka as cosmological-psychological maps (tattvas, kalās, pramātṛ levels). Different sub-schools draw the grids differently.',
        takeaway:
          'Treat this sūtra as a syllabus pointer—memorizing numbers without a map is optional; grasp that one ground is being analyzed under many structural divisions.',
      },
    }
  ),
  ph(
    8,
    'tadbhūmikāḥ sarvadarśanasthitayaḥ',
    'The stages thereof are the positions [assumed by] all philosophical views.',
    {
      translationReaderNote: {
        tightVsLoose:
          '«Darśana» as «philosophical view» is standard; «sthitayaḥ» as «positions» or «stances» is adequate. «Tadbhūmikāḥ» («their stages / grounds») is compressed—English adds «thereof» to link back to the prior enumeration.',
        alternatives:
          'Some read this as legitimating plural philosophies as partial perspectives on layers of the same reality; others stress hierarchy rather than mere plurality.',
        takeaway:
          'Hold pluralism without flattening: the text can honor other systems as «grounds» without saying every map is equally final for practice.',
      },
    }
  ),
  ph(
    9,
    'cidvat tac chaktisaṃkocāt malāvṛtaḥ saṃsārī',
    'Like [pure] consciousness, yet from contraction of that power, covered by impurity—the wanderer in saṃsāra.'
  ),
  ph(
    10,
    'tathāpi tadvat pañcakṛtyāni karoti',
    'Even so, in that same way, he performs the five acts [of Śiva].'
  ),
  ph(
    11,
    'ābhāsanaraktivimarśanabījāvasthāpanavilāpanatas tāni',
    'Through manifesting, attaching, discerning, planting seed, and dissolving—those [acts proceed].',
    {
      translationReaderNote: {
        tightVsLoose:
          'The string is one tight list of five gerunds governing «tāni» («those»—the five acts meant from the previous context). «Vimarśana» as «discerning» is thinner than the technical sense of reflective recognition in Śakta discourse; «vilāpana» as «dissolving» fits reabsorption.',
        alternatives:
          'Traditionally read alongside the five Śiva-acts schema; exact verb-to-act mapping is commentator work.',
        takeaway:
          'Read rhythmically: appearance, involvement, insight, seeding, reabsorption—ponder where you notice that cycle in lived attention, without forcing mystical drama.',
      },
    }
  ),
  ph(
    12,
    'tadaparijñāne svaśaktibhir vyāmohitatā saṃsāritvam',
    'From non-knowledge of that: confusion by one’s own powers—[that] is the condition of saṃsāra.'
  ),
  ph(
    13,
    'tatparijñāne cittam eva antarmukhībhāvena cetanapadādhyārohāt citiḥ',
    'In knowledge of that: mind alone, by inward-facing, by ascent from the plane of the conscious—[is] consciousness (citi).'
  ),
  ph(
    14,
    'citivahnir arohapade channo \'pi mātrayā meyendhanaṃ pluṣyati',
    'The fire of consciousness, on the ascending level, though covered, consumes the fuel of the knowable even in [small] measure.'
  ),
  ph(15, 'balalābhe viśvam ātmasātkaroti', 'On gaining strength, it draws the universe into identity with itself.'),
  ph(
    16,
    'cidānandalābhe dehādiṣu cetyamāneṣv api cidaikātmyapratipattidārḍhyaṃ jīvanmuktiḥ',
    'On attaining bliss-consciousness: even while body and the rest are objects of awareness, firm realization of oneness with consciousness—that is liberation while living.'
  ),
  ph(
    17,
    'madhyavikāsāc cidānandalābhaḥ',
    'From expansion of the middle [channel / center], attainment of bliss-consciousness.'
  ),
  ph(
    18,
    'vikalpakṣayaśaktisaṃkocavikāsavāhacchedādyantakoṭinibhālanādaya iha upāyāḥ',
    'Here the means are: cessation of conceptual constructs; contraction and expansion of power; cutting the currents; piercing the extremities; and the rest.',
    {
      translationReaderNote: {
        tightVsLoose:
          '«Vāha-cheda» and «anta-koṭi-nibhālana» are technical yoga phrases—English uses conventional equivalents («cutting currents,» «piercing extremities») that may under-specify which channels and which «ends» teachers mean. «Ādayaḥ» («and the rest») honestly admits the list continues.',
        alternatives:
          'Upāya-lists vary by lineage (mental, energetic, body-focus). Do not assume this one line replaces a qualified teacher’s sequence.',
        takeaway:
          'Treat as catalog, not DIY surgery manual—curiosity about «what counts as upāya here» is healthy.',
      },
    }
  ),
  ph(
    19,
    'samādhisaṃskāravati vyutthāne bhūyo bhūyaḥ cidaikyāmarśān nityoditasamādhilābhaḥ',
    'In outward-directed [life] bearing traces of samādhi, again and again, from flashing recognition of oneness with consciousness—attainment of ever-risen samādhi.',
    {
      translationReaderNote: {
        tightVsLoose:
          '«Vyutthāna» opposes «samādhi» as normal engaged consciousness; we glossed «outward-directed [life]» to avoid implying only «bad distraction.» «Saṃskāravat» as «bearing traces» is interpretive shading. «Marśa» as «flashing recognition» is looser than the technical «touch / recognition-flash» of the school.',
        alternatives:
          'Some emphasize integration: ordinary activity perfumed by depth absorption; others warn against confusing busy life with samādhi-trace.',
        takeaway:
          'The sūtra points to cumulative recognition in the wild of ordinary mind—not waiting for perfect silence only.',
      },
    }
  ),
  ph(
    20,
    'tadā prakāśānandasāramahāmantravīryātmakapūrṇāhantāveśāt sadā sarvasargasaṃhārakārinijasaṃviddevatācakreśvaratāpraptir bhavatīti śivam',
    'Then, from entering I-hood (ahaṃtā) full of light, bliss-essence, and the potency of the great mantra—always—comes attainment of lordship over the circle of deities of one’s own awareness, which performs all creation and reabsorption. This is the auspicious (Śiva).',
    {
      translationReaderNote: {
        tightVsLoose:
          'The Sanskrit is one massive compound chain; the English breaks it into clauses and inserts «which performs…» to keep grammar parseable. «Pūrṇāhaṃtā» (full I-hood) fused with light-bliss-mantra-vīrya is technical Tantric language; «devatā-cakra» as «circle of deities of one’s own awareness» is one defensible gloss among several.',
        alternatives:
          'Commentators unpack mantra-body, recognition-lordship, and whether «always» (sadā) modifies entry, attainment, or the creative-destructive agency named.',
        takeaway:
          'Sit with the poetry of limit-dissolving I-consciousness without weaponizing «I am Śiva» as ego inflation—let teachers temper slogan with ethic.',
      },
    }
  ),
];
