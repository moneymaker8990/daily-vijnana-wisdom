/**
 * Spanda Kārikā — Sanskrit kārikā text (GRETIL) + English close reading
 *
 * Sanskrit: Vasugupta: Spandakārikā, GRETIL plaintext (input M. Faliero; CC BY-NC-SA 4.0).
 * English in `plainLanguage`: original close reading composed from the Sanskrit for readability
 * (not a copy of any licensed translation).
 *
 * `translationReaderNote` (where present): optional honesty/range/takeaway for dense or disputed lines—one short paragraph per field.
 */

import type { Verse, TranslationReaderNote } from '../types';

const SRC =
  'Sanskrit: GRETIL sa_vasugupta-spandakArikA (Vasugupta: Spandakārikā; input M. Faliero). Licence: CC BY-NC-SA 4.0.';

function sk(
  id: string,
  chapter: number,
  verseNumber: number,
  text: string,
  plainLanguage: string,
  extras?: { tags?: string[]; translationReaderNote?: TranslationReaderNote }
): Verse {
  const tags = extras?.tags ?? ['spanda', 'sanskrit'];
  return {
    id,
    sourceId: 'spanda-karika',
    sourceName: 'Spanda Kārikā',
    tradition: 'Tantric',
    chapter,
    verseNumber,
    text,
    plainLanguage,
    translator: SRC,
    tags,
    translationReaderNote: extras?.translationReaderNote,
  };
}

export const spandaKarikaVerses: Verse[] = [
  sk(
    'spanda-1',
    1,
    1,
    'yasyonmeṣanimeṣābhyāṃ jagataḥ pralayodayau | taṃ śakticakravibhavaprabhavaṃ śaṅkaraṃ stumaḥ',
    'We praise Śaṅkara: from the opening and closing [of the powers’ eyes] come the world’s dissolution and rising; he is the source from which the splendor of the circle of powers springs.'
  ),
  sk(
    'spanda-2',
    1,
    2,
    'yatra sthitam idaṃ sarvaṃ kāryaṃ yasmāc ca nirgataṃ | tasyānāvṛtarūpatvān na nirodho \'sti kutracit',
    'In whom all this rests as effect, and from whom it goes forth—because his nature is uninterrupted, nowhere is there [true] cutting-off.'
  ),
  sk(
    'spanda-3',
    1,
    3,
    'jāgradādi vibhede \'pi tadabhinne prasarpati | nivartate nijānnaiva svabhāvād upalabdhṛtaḥ',
    'Though divided into waking and the rest, [consciousness] moves forth as not other than that; from its own nature it does not cease, for the one who knows.'
  ),
  sk(
    'spanda-4',
    1,
    4,
    'ahaṃ sukhī ca duḥkhī ca raktaś ca ityadisamvidaḥ | sukhādyavasthānusyūte vartante \'nyatra tāḥ sphuṭam',
    'Cognitions such as “I am happy, unhappy, attached,” threaded through states like pleasure and the rest, occur distinctly elsewhere [in the limited formation].'
  ),
  sk(
    'spanda-5',
    1,
    5,
    'na duḥkhaṃ na sukhaṃ yatra na grāhyam grāhakaṃ na ca | na cāsti mūḍhabhāvo \'pi tad asti paramārthataḥ',
    'Where there is neither pain nor pleasure, neither object nor grasping subject, nor even the condition of dull confusion—that [alone] is, in the ultimate sense.'
  ),
  sk(
    'spanda-6',
    1,
    6,
    'yataḥ karaṇavargo \'yaṃ vimūḍho \'mūḍhavat svayam | sahāntareṇa cakreṇa pravṛttisthitisaṃhṛtiḥ',
    'Because this group of powers, [though] confused, moves of itself like one unconfused, together with the inner wheel of arising, abiding, and withdrawal.'
  ),
  sk(
    'spanda-7',
    1,
    7,
    'labhate tatprayatnena parīkṣyaṃ tattvam ādarāt | yataḥ svatantratā tasya sarvatreyam akṛtrimā',
    'With effort and reverent examination one attains that reality to be investigated; for his freedom, in every respect, is not contrived.'
  ),
  sk(
    'spanda-8',
    1,
    8,
    'na hīcchānodanasyāyam prerakatvena vartate | api tv ātmabalasparśāt puruṣas tatsamo bhavet',
    'For this [freedom] does not operate as the one who drives desire and its goads on; rather, by contact with the power of the Self, the person becomes equal to that [freedom].'
  ),
  sk(
    'spanda-9',
    1,
    9,
    'nijāśuddhyāsamarthasya kartavyeṣv abhilāṣiṇaḥ | yadā kṣobhaḥ pralīyeta tadā syāt paramam padam',
    'When agitation subsides in one who lacks ability at inner purification yet longs after duties-to-be-done—then would be the highest state.'
  ),
  sk(
    'spanda-10',
    1,
    10,
    'tadāsyākṛtrimo dharmo jñatvakartṛtvalakṣaṇah | yatas tadepsitaṃ sarvaṃ jānāti ca karoti ca',
    'Then his nature is unartificial, marked by knowing and doing; for he both knows and performs everything wished for.'
  ),
  sk(
    'spanda-11',
    1,
    11,
    'tam adhiṣṭthātṛbhāvena svabhāvam avalokayan | smayamāna ivāste yas tasyeyaṃ kusṛtiḥ kutaḥ',
    'For one who, as overlord, gazes on his own nature as if smiling—whence could wrong conduct belong to him?'
  ),
  sk(
    'spanda-12',
    1,
    12,
    'nābhāvo bhāvyatām eti na ca tatrāsty amūḍhatā | yato \'bhiyogasaṃsparśāt tadāsid iti niścayah',
    'Non-being does not become what is to be; nor is there freedom-from-confusion there; from contact of [right] application, certainty [arises]: “then it was.”'
  ),
  sk(
    'spanda-13',
    1,
    13,
    'atas tatkṛtrimaṃ jñeyaṃ sauṣuptapadavat sadā | na tv evaṃ smaryamāṇatvaṃ tat tattvam pratipadyate',
    'Therefore that [world] is to be known as constructed—always like the deep-sleep condition; not thus by mere being-remembered does one attain that reality.'
  ),
  sk(
    'spanda-14',
    1,
    14,
    'avasthāyugalaṃ cātra kāryakartṛtvaśabditam | kāryatā kṣayiṇī tatra kartṛtvam punar akṣayam',
    'Here the pair of conditions is called effectedness and agency: therein effectedness perishes, but agency does not perish.'
  ),
  sk(
    'spanda-15',
    1,
    15,
    'kāryonmukhaḥ prayatno yaḥ kevalaṃ so \'tra lupyate | tasmin lupte vilupto \'smīty abudhaḥ pratipadyate',
    'The effort aimed solely at effect perishes here; when it perishes, the undiscerning one adopts “I have perished.”'
  ),
  sk(
    'spanda-16',
    1,
    16,
    'na tu yo \'ntarmukho bhāvah sarvajñātvaguṇāspadam | tasya lopaḥ kadācit syād anyasyānupalambhanāt',
    'But not the inward condition that is the seat of omniscience’s quality—only from failure to apprehend the other [limited view] could its loss sometimes occur.'
  ),
  sk(
    'spanda-17',
    1,
    17,
    'tasyopalabdhiḥ satataṃ tripadāvyabhicāriṇī | nityaṃ syāt suprabuddhasya tadādyante parasya tu',
    'Its apprehension is constant and unfailing through the three states; for the well-awakened it is always so; for another, at beginning and end [only].'
  ),
  sk(
    'spanda-18',
    1,
    18,
    'jñānajñeyasvarūpiṇyā śaktyā paramayā yutaḥ | padadvaye vibhur bhāti tadanyatra tu cinmayaḥ',
    'Yoked with the supreme Power whose form is knower and known, [he] shines vast in the two footings; other than that, [he is] sheer consciousness.',
    {
      translationReaderNote: {
        tightVsLoose:
          'The pairing of knowledge and what-is-known with supreme śakti maps cleanly; the stretch is «two footings» (pada-dvaya)—English has to guess which concrete pair the kārikā intends (states, poles, or levels commentaries associate with manifestation). «Vibhuḥ» (far-reaching / lordly) is kept as «shines vast.»',
        alternatives:
          'Readers disagree whether pada-dvaya means waking and dream, inner and outer, subject and object, or mantra-related dyads. «Anyatra … cinmayaḥ» is usually «elsewhere [than those paired appearances] only consciousness,» but the precise scope of «elsewhere» depends on the commentator you follow.',
        takeaway:
          'Use the verse to notice how knowing always shows up as a pair—then ask what is already there that is not exhausted by the pair. Do not treat one commentarial diagram as historical fact.',
      },
    }
  ),
  sk(
    'spanda-19',
    1,
    19,
    'guṇādispandaniḥṣyandāḥ sāmānyaspandasaṃśrayāt | labdhātmalābhaḥ satataṃ syur jñasyāparipanthinaḥ',
    'Ripples of qualities and the rest, streaming from resort in the universal pulse—for the wise, gain of the Self is constant and unobstructed.'
  ),
  sk(
    'spanda-20',
    1,
    20,
    'aprabudhadhiyas tv ete svasthitisthaganodyatāḥ | pātayanti duruttāre ghore saṃsāravartmani',
    'But these of unawakened intellect, eager to hide their own standing, hurl [one] onto the fearsome, hard-to-cross path of wandering.'
  ),
  sk(
    'spanda-21',
    1,
    21,
    'ataḥ satatam udyuktaḥ spandatattvaviviktaye | jāgrad eva nijam bhāvam acireṇādhigacchati',
    'Therefore one ever striving to discern the spanda-principle, while awake, attains one’s own state before long.'
  ),
  sk(
    'spanda-22',
    1,
    22,
    'atikruddhaḥ prahṛṣṭo vā kiṃ karomīti vā mṛśan | dhāvan va yat padaṃ gacchet tatra spandaḥ pratiṣṭhitaḥ',
    'Very angry or exultant, or pondering “What shall I do?”—or running: whatever footing one reaches, there spanda is established.'
  ),
  sk(
    'spanda-23',
    1,
    23,
    'yām avasthāṃ samālambya yad ayam mama vakṣyati | tadavaśyaṃ kariṣye \'ham iti saṃkalpya tiṣṭhati',
    'Resorting to whatever state [thinking], “What he will say to me I shall surely do,” one remains having formed that resolve.'
  ),
  sk(
    'spanda-24',
    1,
    24,
    'tām aśrityordhvamārgeṇa candrasūryāv ubhāv api | sauṣumne \'dhvanyastamito hitvā brahmā.ṅdagocaram',
    'Relying on that, by the upward path, both moon and sun merge in the suṣumnā course, leaving the sphere of the cosmic egg.',
    {
      translationReaderNote: {
        tightVsLoose:
          'Moon and sun as subtle currents and suṣumnā as the central channel are standard; «astamita» (merged / set) is rendered loosely as «merge.» «Brahmāṇḍa-gocaram» is translated as «sphere of the cosmic egg» to signal macrocosmic range without pretending a single English equivalent.',
        alternatives:
          'Different lineages specify iḍā / piṅgala and technical stages differently; some read the passage more symbolically (interior reconciliation of opposites) and some more physiologically.',
        takeaway:
          'Take it as a pointer to inward union of opposed energies, not as proof-text for a fixed anatomy lesson. If you practice with a teacher, let their map refine yours.',
      },
    }
  ),
  sk(
    'spanda-25',
    1,
    25,
    'tadā tasmin mahāvyomni pralīnaśaśibhāskare | sauṣuptapadavan mūḍhaḥ prabuddhaḥ syād anāvṛtaḥ',
    'Then in that great sky, with moon and sun dissolved—like deep sleep—the deluded one becomes awakened, unobstructed.',
    {
      translationReaderNote: {
        tightVsLoose:
          'The image of sky and dissolved sun/moon is clear; «sauṣupta-pada-vat» (like the deep-sleep condition) is approximate—we grouped it with the preceding clause to keep the simile readable. The subject of «prabuddhaḥ» («awakened») is supplied as «the deluded one» from «mūḍhaḥ», which matches one common reading but not the only grammatical option.',
        alternatives:
          'Some commentators read the ending as describing the sage’s unveiled awareness rather than a transformation of the «deluded»; the Sanskrit allows fine tense and syncretism debates.',
        takeaway:
          'Regardless of parsing, the gesture is limit-dissolving rest that is not mere blankness. Stay curious about how «sleep-like» and «awakened» can co-relate in this tradition.',
      },
    }
  ),
  sk(
    'spanda-26',
    2,
    1,
    'tadākramya balam mantrāḥ sarvajñābalaśālinaḥ | pravartante \'dhikārāya karaṇānīva dehinām',
    'Having seized that power, mantras rich in omniscient power set forth for empowerment, like the senses for embodied beings.'
  ),
  sk(
    'spanda-27',
    2,
    2,
    'tatraiva sampralīyante śāntarūpā nirañjanāḥ | sahārādhakacittena tenaite śivadharmiṇaḥ',
    'Right there they reabsorb, tranquil, stainless, together with the worshipper’s mind—therefore these partake of Śiva’s nature.'
  ),
  sk(
    'spanda-28',
    2,
    3,
    'yasmāt sarvamayo jīvaḥ sarvabhāvasamudbhavāt | tatsaṃvedanarūpeṇa tādātmyapratipattitaḥ',
    'Because the soul is all-formed, from the arising of all beings—through the form of experiencing that, through realizing identity with it.'
  ),
  sk(
    'spanda-29',
    2,
    4,
    'tasmāc chabdārthacintāsu na sāvasthā na yā śivaḥ | bhoktaiva bhogyabhāvena sadā sarvatra saṃsthitaḥ',
    'Therefore in pondering word and meaning there is no condition where Śiva is not; always, everywhere, he abides as enjoyer in the mode of the enjoyed.'
  ),
  sk(
    'spanda-30',
    2,
    5,
    'iti vā yasya saṃvittiḥ krīḍātvenākhilaṃ jagat | sa paśyan satataṃ yukto jīvanmukto na saṃśayaḥ',
    'Or whose awareness [is] that the whole world is play—seeing thus, constantly yoked, without doubt he is liberated in life.'
  ),
  sk(
    'spanda-31',
    2,
    6,
    'ayam evodayas tasya dhyeyasya dhyāyicetasi | tadātmatāsamāpattir icchataḥ sādhakasya yā',
    'This alone is the arising in the mind of the meditator and the meditated—sameness with that, for the practitioner who desires.'
  ),
  sk(
    'spanda-32',
    2,
    7,
    'iyam evāmṛtaprāptir ayam evātmano grahaḥ | iyaṃ nirvāṇa-dīkṣā ca śivasadbhāvadāyini',
    'This alone is nectar’s attainment; this alone grasp of the Self; this alone initiation into nirvāṇa, O giver of Śiva’s true being.'
  ),
  sk(
    'spanda-33',
    3,
    1,
    'yathecchābhyarthito dhātā jāgrato \'rthān hṛdi sthitān somasūryodayaṃ kṛtvā sampādayati dehinaḥ',
    'Just as the Granter (Lord), when invoked by intention, brings about for the waking one objects abiding in the heart—making moon and sun rise—for the embodied.',
    {
      translationReaderNote: {
        tightVsLoose:
          'The parallel «just as … in waking» is faithful; «dhātṛ / Granter» imports a theistic gloss. «Making moon and sun rise» is literal for soma-sūrya-udaya but clearly symbolic of energizing interior objects—not astronomy.',
        alternatives:
          'Some read «ārthāḥ» as aims, values, or intended outcomes as much as «things»; commentaries connect moon/sun to inner currents or to time cycles.',
        takeaway:
          'Use this as an analogy clause for later dream verses: experience is ordered by a deeper principle, not only by surface habit.',
      },
    }
  ),
  sk(
    'spanda-34',
    3,
    2,
    'tathā svapne \'py abhīṣṭārthān praṇayasyānatikramāt | nityaṃ sphuṭataraṃ madhye sthito \'vaśyaṃ prakāśayet',
    'So too in dream: desired objects, with mutual relation unbroken—while [awareness] abides in the center—would necessarily shine forth still more clearly, always.',
    {
      translationReaderNote: {
        tightVsLoose:
          '«Praṇayasya anatikrama» (no transgression of intimacy / mutual relation) is compressed into «mutual relation unbroken»—possible emotional or cosmological nuances are flattened.',
        alternatives:
          'Who «stands in the middle» (madhye sthitaḥ) is disputed: subtle self, witnessing awareness, or the power coordinating dream. «Avashaṃ prakāśayet» could be impersonal («it would reveal») rather than «would shine forth» with a hidden subject.',
        takeaway:
          'The point is continuity of ordering principle between waking and dream; keep technical options open while noticing your own dream-life patterns.',
      },
    }
  ),
  sk(
    'spanda-35',
    3,
    3,
    'anyathā tu svatantrā syāt sṛṣṭis taddharmakatvataḥ | satataṃ laukikasyeva jāgratsvapnapadadvaye',
    'Otherwise creation would be independent—from being of that very nature—constantly, as for the worldly one in waking and dream alike.',
    {
      translationReaderNote: {
        tightVsLoose:
          'The logic «otherwise … would be independent» follows the Sanskrit; «that very nature» refers back to the Lord’s freedom (svatantrya) implied in prior verses—English has to supply the referent.',
        alternatives:
          'Some glosses emphasize that without the continuity thesis, the cosmos would look like random spontaneity with no inner logic.',
        takeaway:
          'Notice the argument form: if experience is lawless, it collapses into something like ordinary fluctuation; the verse invites you to test whether your world-feel is merely chaotic.',
      },
    }
  ),
  sk(
    'spanda-36',
    3,
    4,
    'yathā hi artho \'sphuṭo dṛṣṭaḥ sāvadhāne \'pi cetasi | bhūyaḥ sphuṭataro bhāti svabalodyogabhāvitaḥ',
    'For just as an object seen unclearly in an attentive mind shines forth clearer when empowered by its own force of exertion—',
    {
      translationReaderNote: {
        tightVsLoose:
          'The simile of dim-then-clear perception is straightforward; «svabalodyogabhāvitaḥ» bundles «own power + effort + being strengthened»—we shortened to «its own motive force» sense.',
        alternatives:
          'Commentaries extend the analogy to mantra, grace, or breakthrough moments in practice when latent meaning becomes vivid.',
        takeaway:
          'You are being given a cognitive analogy before a metaphysical claim: clarity can intensify without a new «object» arriving from outside.',
      },
    }
  ),
  sk(
    'spanda-37',
    3,
    5,
    'tathā yat paramārthena yena yatra yathā sthitam | tat tathā balam ākramya na cirāt sampravartate',
    '—so what exists in truth, by whom, where, as placed—that, having force seized thus, comes into effect before long.',
    {
      translationReaderNote: {
        tightVsLoose:
          'The correlative «yena yatra yathā» (by whom, where, in what manner) is kept but reordered for prose; «ākramya» (attack? overwhelm? seize?) is read as «having force seized»—militaristic nuance softened.',
        alternatives:
          'Some translations emphasize «overcoming» obstacles or «entering» a real state rather than gradual manifestation.',
        takeaway:
          'Pair with the previous verse: what is already real becomes operative when awareness’s power engages; resist both magical thinking and cynicism.',
      },
    }
  ),
  sk(
    'spanda-38',
    3,
    6,
    'durbalo \'pi tadākramya yataḥ kārye pravartate | ācchādayed bubhukṣāṃ ca tathā yo \'ti bubhukṣitaḥ',
    'Even weak, having seized that, because it sets action in motion—it would cover hunger too, likewise one who is very hungry.',
    {
      translationReaderNote: {
        tightVsLoose:
          'The paradox «even weak … sets action in motion» is close; «bubhukṣā» (desire to eat / appetite) is translated as «hunger.» «Ācchādayet» as «cover» may under-translate shades of concealment or appeasement.',
        alternatives:
          'Commentators connect appetite to all conditioned drives, not only literal food.',
        takeaway:
          'The lesson is disproportionate efficacy of the true principle even when the person feels feeble—without encouraging spiritual bypass of real fatigue or medical need.',
      },
    }
  ),
  sk(
    'spanda-39',
    3,
    7,
    'anenādhiṣṭhite dehe yathā sarvajñatādayaḥ | tathā svātmany adhiṣṭhānāt sarvatraivam bhaviṣyati',
    'As when this [principle] rules the body, omniscience and the rest—so, when established in one’s own self, thus it will be everywhere.',
    {
      translationReaderNote: {
        tightVsLoose:
          '«Adhiṣṭhita» (ruled / presided over) is clear; «sarvajñatā-ādayaḥ» («omniscience and the rest») is vague on purpose—the Sanskrit points to a list of powers without enumerating here.',
        alternatives:
          'Some read this as powers of śakti manifesting in a perfected body; others as recognition that the same awareness knows all domains when contraction relaxes.',
        takeaway:
          'Body is laboratory first; «everywhere» follows from depth of establishment—hold that order so the verse does not become airy abstraction.',
      },
    }
  ),
  sk(
    'spanda-40',
    3,
    8,
    'glānir vilu.ṅthikā dehe tasyāścājñānataḥ sṛtiḥ | tad unmeṣaviluptaṃ cet kutaḥ sā syād ahetukā',
    'Weariness is shaking-tossing in the body; its flow comes from ignorance; if that is destroyed by emergence [of awareness], how could it be without cause?',
    {
      translationReaderNote: {
        tightVsLoose:
          'GRETIL’s «vilu.ṅthikā» (with dot) reflects manuscript transmission; we gloss «tossing / shaking» weakness. «Sṛtiḥ» as «flow» is interpretive (could be movement, course, or arising).',
        alternatives:
          'Commentaries link «unmeṣa» to flash of consciousness or expansion; some read the rhetorical question as: meaningless affliction cannot stand without ignorance to feed it.',
        takeaway:
          'Track how lethargy and micro-agitation can be cognitively gated; stay humble—«emergence» is not a cliché positivity slogan.',
      },
    }
  ),
  sk(
    'spanda-41',
    3,
    9,
    'ekacintāprasaktasya yataḥ syād aparodayaḥ | unmeṣaḥ sa tu vijñeyaḥ svayaṃ tam upalakṣayet',
    'For one absorbed in one thought, when another could arise—that emergence is to be known; one should observe it oneself.',
    {
      translationReaderNote: {
        tightVsLoose:
          '«Unmeṣa» (opening / emergence) is technical in this corpus; we kept «emergence» to preserve overlap with earlier verses. «Aparodayaḥ» as «another could arise» is smooth.',
        alternatives:
          'Some teachers link this to spontaneous gaps between fixations; others to deeper Śakti-movement rather than ordinary mental content switching.',
        takeaway:
          'Invite direct observation of micro-shifts in attention instead of only conceptual belief about spanda.',
      },
    }
  ),
  sk(
    'spanda-42',
    3,
    10,
    'ato bindur ato nādo rūpam asmād ato rasaḥ | pravartante \'cireṇaiva kṣobhakatvena dehinaḥ',
    'Hence bindu, hence nāda, hence form from this, hence taste—before long they arise as agitators for the embodied.',
    {
      translationReaderNote: {
        tightVsLoose:
          'Enumerating bindu / nāda / rūpa / rasa is tight mantra-śāstra vocabulary; «kṣobhakatvena» («as agitators») is interpretive—we highlight perturbation rather than neutral unfolding.',
        alternatives:
          'Lineages map these to stages of sonic manifestation, subtle elements, or internalized ritual physiology; the kārikā itself does not rehearse the full map.',
        takeaway:
          'Treat as a warning that subtle phenomena have momentum—curiosity without fixation, ideally with initiation context.',
      },
    }
  ),
  sk(
    'spanda-43',
    3,
    11,
    'didṛkṣayeva sarvārthān yadā vyāpyāvatiṣṭhate | tadā kiṃ bahunoktena svayam eva avabhotsyate',
    'When, as with desire to see all objects, [consciousness] stands having pervaded—then why much talk? One will understand by oneself.',
    {
      translationReaderNote: {
        tightVsLoose:
          '«Didṛkṣayā iva» («as if with desire to see») sets a simile; the elided subject of «vyāpya avatiṣṭhate» is supplied as consciousness—common but not printed in the Sanskrit.',
        alternatives:
          'Some read pervasive stance as the mark of non-dual recognition rather than ordinary striving curiosity.',
        takeaway:
          'The verse privileges direct recognition over prolix theory—without mocking learning. Balance study with experiential honesty.',
      },
    }
  ),
  sk(
    'spanda-44',
    3,
    12,
    'prabuddhaḥ sarvadā tiṣṭhej jñānenālokya gocaram | ekatrāropayet sarvaṃ tato \'nyena na pīḍyate',
    'The awakened one should ever abide, illumining the field with knowledge; having placed all in one, one is not tormented by another.',
    {
      translationReaderNote: {
        tightVsLoose:
          '«Gocara» as «field» is wide; «ekatra āropayet» as «having placed all in one» compresses ritual-philosophical nuance of «superimposition» or «gathering» manifold onto a single ground.',
        alternatives:
          '«Anyena» can mean another object, another person, or another viewpoint; non-dual readings stress freedom from inner division.',
        takeaway:
          'Experiment with «gathering» multiplicity without crushing it—this is not forced positivity or spiritual bypass.',
      },
    }
  ),
  sk(
    'spanda-45',
    3,
    13,
    'śabdarāśisamutthasya śaktivargasya bhogyatām | kalāviluptavibhavo gataḥ san sa paśuḥ smṛtaḥ',
    'One gone, splendor lost through dwindling of the creative power, who has taken on the “to-be-enjoyed” nature of the śakti-group risen from the mass of words—that one is called a bound soul (paśu).',
    {
      translationReaderNote: {
        tightVsLoose:
          'The one long English sentence mirrors the compound chains only loosely. «Śabda-rāśi» is «mass / heap of words» (language as construct); «bhogyatā» is passive «objecthood.» «Kalā-vilupta-vibhavaḥ» bundles power-loss through diminished «kalā»—technical sense of creative phase—rendered as «splendor lost through dwindling of the creative power.»',
        alternatives:
          '«Paśu» (bound soul) here is technical, not an insult to animals or people; commentaries link the condition to fascination with linguistic appearances.',
        takeaway:
          'Notice when you are lived by language and roles rather than resting as awareness—the verse names a trap, not an identity sentence about «bad people.»',
      },
    }
  ),
  sk(
    'spanda-46',
    3,
    14,
    'parāmṛtarasāpāyas tasya yaḥ pratyayodbhavaḥ | tenāsvatantratām eti sa ca tanmātragocaraḥ',
    'Whatever arising of cognition from drinking the juice of supreme nectar—by that he enters unfreedom; and that [cognition] has only that [level] as its scope.',
    {
      translationReaderNote: {
        tightVsLoose:
          '«Parāmṛta-rasa» is hyperbolic nectar-language; «pratyayodbhava» is cognitive arising—English keeps both. The last clause «sa ca tan-mātra-gocaraḥ» is cryptic; «that awareness only ranges within that [limited sphere]» is one defensible reading.',
        alternatives:
          'Some commentators read even «nectar» experience as binding if grasped dualistically; others distinguish grades of amṛta.',
        takeaway:
          'Sweet states can still narrow capacity—spiritual experience is not automatically liberation.',
      },
    }
  ),
  sk(
    'spanda-47',
    3,
    15,
    'svarūpāvaraṇe cāsya śaktayaḥ satatotthitāḥ | yataḥ śabdānuvedhena na vinā pratyayodbhavaḥ',
    'And in the covering of his own form, powers constantly arise; for without phonemic unfolding there is no arising of cognition.',
    {
      translationReaderNote: {
        tightVsLoose:
          '«Śabdānuvedha» is technical (pervasion / impregnation by sound-seed); we rendered as «phonemic unfolding» to hint at subtle sound without over-specifying which level.',
        alternatives:
          'Classroom explanations map this to varṇa / mantra emergence before ordinary mental content.',
        takeaway:
          'The verse ties everyday cognition to sonic-śakti substratum—take it as invitation to humility about how thoughts arise, not as dogma against pre-verbal awareness.',
      },
    }
  ),
  sk(
    'spanda-48',
    3,
    16,
    'seyaṃ kriyātmikā śaktiḥ śivasya paśuvartinī | bandhayitrī svamārgasthā jñāta siddhyupapādikā',
    'That is Śiva’s action-śakti, moving among bound souls—binding, staying on its own path; once known, it brings attainment.',
    {
      translationReaderNote: {
        tightVsLoose:
          '«Paśu-vartinī» («moving among / dealing with bound souls») is tight enough; «sva-mārga-sthā» as «staying on its own path» smooths a technical point about śakti following a prescribed course.',
        alternatives:
          'Some read less moralistic «binding» and more structural limitation; «siddhi» spans mundane powers to liberation depending on commentator.',
        takeaway:
          'Recognition of the same kinetic power that binds is said to reorient it—hold the dynamism, not only fear of «bondage» language.',
      },
    }
  ),
  sk(
    'spanda-49',
    3,
    17,
    'tanmātrodayarūpeṇa mano \'haṃbuddhivartinā | puryaṣṭakena saṃruddhas taduttham pratyayodbhavam',
    'In the form of mere arising-of-that, mind moving in I-feeling and intellect, confined by the eight cities—arising of cognition born of that.',
    {
      translationReaderNote: {
        tightVsLoose:
          '«Puryaṣṭaka» (eightfold city / subtle body vehicle) is jargon; we left it as «eight cities» per common gloss rather than anatomizing eight members here. «Tan-mātra-udaya» as «mere arising-of-that» tries to preserve the «only that» nuance of contraction.',
        alternatives:
          'Maps of the eight differ across texts; some modern readers psychologize as aggregated self-sense plus faculties.',
        takeaway:
          'Do not idolize one chart—use the verse to feel how I-thought and body-world image scaffold every cognition.',
      },
    }
  ),
  sk(
    'spanda-50',
    3,
    18,
    'bhuṅkte paravaśo bhogaṃ tadbhāvāt saṃsared ataḥ | saṃsṛtipralayasyāsya kāraṇaṃ sampracakṣmahe',
    'Subject to another, he enjoys enjoyment; from that condition he wanders—therefore we declare the cause of this wandering and its dissolution.',
    {
      translationReaderNote: {
        tightVsLoose:
          '«Para-vaśa» as «subject to another» generalizes the lord (para) controlling enjoyment; «saṃsṛti-pralaya» pairs round-of-life with its subsiding—English adds «we declare» to mark pedagogical voice.',
        alternatives:
          'Commentaries identify «other» as māyīya limitation, habit, or externalized Lord; the ethical tone varies.',
        takeaway:
          'Notice habitual outsourcing of agency—then ask what recognition of freedom does to cause-and-effect language without blame games.',
      },
    }
  ),
  sk(
    'spanda-51',
    3,
    19,
    'yadā tv ekatra saṃrūḍhas tadā tasya layodayau | niyacchan bhoktṛtām eti tataś cakreśvaro bhavet',
    'When [awareness] is gathered into one, then he directs its dissolution and arising; he attains enjoyership; thence he becomes lord of the wheel.',
    {
      translationReaderNote: {
        tightVsLoose:
          '«Saṃrūḍha» as «gathered» is interpretive (can mean absorbed, condensed, integrated). «Cakreśvara» («lord of the wheel») may refer to wheels of powers, worlds, or subtle maṇḍala imagery—we keep the generic English.',
        alternatives:
          'Commentaries debate who «directs» dissolution and rising—the limited self transformed or Śakti under recognition.',
        takeaway:
          'Freedom-here reads as mastery-within-rhythm: relating honestly to cycles instead of denying appearance altogether.',
      },
    }
  ),
  sk(
    'spanda-52',
    4,
    1,
    'agādhasaṃśayāmbhodhisamuttaraṇatārinīm | vande vicitrārthapadāṃ citrāṃ tāṃ gurubhāratīm',
    'I praise that guru-speech, varied in sense and word, wonderful—the boat that ferries across the ocean of doubt without bottom.'
  ),
  sk(
    'spanda-53',
    4,
    2,
    'labdhvāpy alabhyam etaj jñānadhanaṃ hṛdguhāntakṛtanihiteḥ | vasuguptavac chivāya hi bhavati sadā sarvalokasya',
    'Having gained even this hard-to-gain treasure of knowledge, hidden in the depths of the heart-cave—as for Vasugupta, for Śiva it is always [so] for every world.'
  ),
];
