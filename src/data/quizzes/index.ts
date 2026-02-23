/**
 * Quiz Data — Knowledge checks for 3 flagship courses
 *
 * advaita-essentials (8 lessons), nature-of-self (6 lessons), nonduality-across (6 lessons)
 * 2-3 multiple-choice questions per lesson with explanations.
 */

import type { QuizQuestion } from './types';

const QUIZ_DATA: Record<string, Record<string, QuizQuestion[]>> = {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ADVAITA ESSENTIALS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  'advaita-essentials': {
    'ae-1': [
      {
        id: 'ae-1-1',
        question: 'What does "Advaita" literally mean?',
        options: ['One God', 'Not two (non-dual)', 'Beyond the mind', 'Pure consciousness'],
        correctIndex: 1,
        explanation: '"Advaita" is Sanskrit for "not two" — the teaching that reality is non-dual, that the apparent separation between self and world is an illusion.',
      },
      {
        id: 'ae-1-2',
        question: 'Which of these is NOT a primary Advaita Vedanta text?',
        options: ['Ashtavakra Gita', 'Vivekachudamani', 'Tao Te Ching', 'Yoga Vasistha'],
        correctIndex: 2,
        explanation: 'The Tao Te Ching is a Taoist text. Ashtavakra Gita, Vivekachudamani, and Yoga Vasistha are key Advaita Vedanta scriptures.',
      },
      {
        id: 'ae-1-3',
        question: 'In Advaita, liberation (moksha) is primarily understood as:',
        options: ['Reaching heaven after death', 'Direct recognition of your already-free nature', 'Accumulating good karma', 'Mastering difficult yoga postures'],
        correctIndex: 1,
        explanation: 'Advaita teaches that liberation is not something to be gained but recognized — you are already free; the apparent bondage is illusion.',
      },
    ],
    'ae-2': [
      {
        id: 'ae-2-1',
        question: 'The five sheaths (pancha koshas) include all EXCEPT:',
        options: ['Food sheath (annamaya)', 'Bliss sheath (anandamaya)', 'Karma sheath (karmamaya)', 'Intellect sheath (vijnanamaya)'],
        correctIndex: 2,
        explanation: 'The five koshas are: annamaya (food/body), pranamaya (breath/energy), manomaya (mind), vijnanamaya (intellect), and anandamaya (bliss). There is no "karma sheath."',
      },
      {
        id: 'ae-2-2',
        question: 'When Advaita says "You are not the body," it means:',
        options: ['The body is evil and should be rejected', 'Your essential nature is awareness, not the physical form', 'Physical health doesn\'t matter', 'The body is just an illusion with no function'],
        correctIndex: 1,
        explanation: 'The teaching points to awareness as your essential nature. The body is not rejected — it\'s simply recognized as not being who you fundamentally are.',
      },
    ],
    'ae-3': [
      {
        id: 'ae-3-1',
        question: 'In Advaita, what is the mind primarily understood as?',
        options: ['The true self', 'A bundle of thoughts arising in awareness', 'An enemy to be destroyed', 'The seat of the soul'],
        correctIndex: 1,
        explanation: 'The mind is seen as a flow of thoughts appearing in awareness — not the self, but an object observed by the self.',
      },
      {
        id: 'ae-3-2',
        question: 'What does "neti neti" mean in the Upanishadic tradition?',
        options: ['Yes, yes — affirming all', 'Not this, not this — a method of negation', 'Maybe, maybe — suspending judgment', 'Here, here — pointing to the present'],
        correctIndex: 1,
        explanation: '"Neti neti" (not this, not this) is the Upanishadic method of arriving at truth by negating everything that is not the Self.',
      },
    ],
    'ae-4': [
      {
        id: 'ae-4-1',
        question: 'What does "self-luminous" (svayam-prakasha) mean regarding consciousness?',
        options: ['It produces physical light', 'It is aware by its own nature — needing nothing else to know itself', 'It can only be known through meditation', 'It requires a teacher to be activated'],
        correctIndex: 1,
        explanation: 'Consciousness is self-luminous — it illuminates itself. Unlike objects which need light to be seen, awareness knows itself directly.',
      },
      {
        id: 'ae-4-2',
        question: 'The Advaita statement "Brahman alone is real" implies:',
        options: ['The physical world does not exist at all', 'Only pure consciousness has absolute, unchanging reality', 'Gods and deities are unimportant', 'We should withdraw from society'],
        correctIndex: 1,
        explanation: 'The statement means that only Brahman (pure consciousness) has absolute reality. The world has relative reality — it appears but is not ultimately separate from Brahman.',
      },
    ],
    'ae-5': [
      {
        id: 'ae-5-1',
        question: 'The dream metaphor in Advaita is used to illustrate that:',
        options: ['Life is meaningless', 'The waking world, like a dream, appears within consciousness', 'We should sleep more to gain wisdom', 'Reality only exists when we\'re awake'],
        correctIndex: 1,
        explanation: 'Just as a dream world appears real within dream consciousness, the waking world appears within waking consciousness. Both are appearances in awareness.',
      },
      {
        id: 'ae-5-2',
        question: 'When Advaita says the world is "mithya," it means:',
        options: ['The world is completely non-existent', 'The world is neither absolutely real nor absolutely unreal', 'The world is an illusion created by an evil force', 'Only India is real'],
        correctIndex: 1,
        explanation: 'Mithya means the world has dependent or relative reality — it appears, but it has no independent existence apart from Brahman (consciousness).',
      },
    ],
    'ae-6': [
      {
        id: 'ae-6-1',
        question: 'According to Ashtavakra, bondage is:',
        options: ['Caused by past-life karma that must be exhausted', 'A false identification — imagining yourself to be bound', 'Punishment for moral failings', 'Something only a guru can remove'],
        correctIndex: 1,
        explanation: 'The Ashtavakra Gita teaches that bondage is nothing but the belief in bondage. Recognition of your true nature instantly dissolves the illusion.',
      },
      {
        id: 'ae-6-2',
        question: 'What is the root cause of suffering in Advaita?',
        options: ['Bad karma', 'False identification with body and mind', 'Lack of devotion', 'Living in the material world'],
        correctIndex: 1,
        explanation: 'Suffering arises from mistaking yourself for the limited body-mind. Once true nature is recognized, the root of suffering dissolves.',
      },
    ],
    'ae-7': [
      {
        id: 'ae-7-1',
        question: 'How does a person "established in truth" (jivanmukta) act in the world?',
        options: ['They withdraw from all activity', 'They act naturally without a sense of being a separate doer', 'They follow strict rules at all times', 'They only perform religious rituals'],
        correctIndex: 1,
        explanation: 'A jivanmukta acts naturally and spontaneously, free from the illusion of being a separate doer. Actions happen through them, not from ego.',
      },
      {
        id: 'ae-7-2',
        question: 'Living Advaita means:',
        options: ['Renouncing the world and becoming a monk', 'Integrating non-dual understanding into everyday activities', 'Only reading scriptures', 'Having no emotions'],
        correctIndex: 1,
        explanation: 'Living Advaita means carrying the recognition of non-duality into ordinary life — work, relationships, and daily activities.',
      },
    ],
    'ae-8': [
      {
        id: 'ae-8-1',
        question: 'The phrase "nothing to attain" in Advaita points to:',
        options: ['Spiritual laziness', 'The fact that what you seek is already what you are', 'Giving up on spiritual practice entirely', 'The impossibility of enlightenment'],
        correctIndex: 1,
        explanation: 'There is nothing to attain because your true nature as awareness is already present. The seeking itself can obscure what is already here.',
      },
      {
        id: 'ae-8-2',
        question: 'What is the final message of the Advaita path?',
        options: ['Keep striving harder', 'You were never bound — rest in what you are', 'Only special people can be liberated', 'Liberation comes only after death'],
        correctIndex: 1,
        explanation: 'The ultimate teaching is that you were never truly bound. Liberation is not a future event but a present recognition.',
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // NATURE OF SELF
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  'nature-of-self': {
    'nos-1': [
      {
        id: 'nos-1-1',
        question: '"Who am I?" (atma-vichara) is a practice associated with which teacher?',
        options: ['The Buddha', 'Ramana Maharshi', 'Lao Tzu', 'St. John of the Cross'],
        correctIndex: 1,
        explanation: 'Atma-vichara (self-inquiry) is the core practice taught by Ramana Maharshi, who directed seekers to trace the "I" thought back to its source.',
      },
      {
        id: 'nos-1-2',
        question: 'Self-inquiry differs from ordinary thinking because:',
        options: ['It uses more complex logic', 'It turns attention back toward the one who is asking', 'It requires a special mantra', 'It should only be done at dawn'],
        correctIndex: 1,
        explanation: 'Self-inquiry is not about finding an intellectual answer but about directing awareness back to its own source — the one asking "Who am I?"',
      },
    ],
    'nos-2': [
      {
        id: 'nos-2-1',
        question: 'The body-consciousness discrimination is about:',
        options: ['Hating the body', 'Recognizing what remains constant when the body changes', 'Achieving physical perfection', 'Leaving the body in meditation'],
        correctIndex: 1,
        explanation: 'This practice asks: if the body changes constantly (from infant to elder), what remains unchanged? That unchanging awareness is the Self.',
      },
      {
        id: 'nos-2-2',
        question: 'Which Upanishadic teaching says "I am not this body, I am not this mind"?',
        options: ['The teaching of the five sheaths (koshas)', 'The eight limbs of yoga', 'The four noble truths', 'The ten commandments'],
        correctIndex: 0,
        explanation: 'The pancha kosha (five sheaths) analysis systematically shows that you are not any layer — body, breath, mind, intellect, or even bliss — but the awareness in which they appear.',
      },
    ],
    'nos-3': [
      {
        id: 'nos-3-1',
        question: 'The "witness" (sakshi) in Advaita is:',
        options: ['A special deity that watches over you', 'Pure awareness that observes thoughts without being affected by them', 'The mind watching itself', 'A guardian angel'],
        correctIndex: 1,
        explanation: 'The witness (sakshi) is pure awareness — it observes all mental activity but is never changed or touched by what it witnesses.',
      },
      {
        id: 'nos-3-2',
        question: 'The Kena Upanishad asks: "By whom is the mind directed?" This points to:',
        options: ['The brain', 'A higher intelligence beyond the mind', 'Random neural firing', 'External forces'],
        correctIndex: 1,
        explanation: 'The Kena Upanishad\'s question reveals that the mind cannot know its own source. That which enables the mind to function is beyond the mind — it is awareness itself.',
      },
    ],
    'nos-4': [
      {
        id: 'nos-4-1',
        question: 'Turiya is the "fourth state" that is:',
        options: ['A deep drug-induced state', 'The awareness that is present in waking, dreaming, and deep sleep', 'A rare state only saints achieve', 'Unconsciousness'],
        correctIndex: 1,
        explanation: 'Turiya is not a separate state but the ever-present awareness that underlies and pervades waking, dreaming, and deep sleep.',
      },
      {
        id: 'nos-4-2',
        question: 'Awareness is called "self-luminous" because:',
        options: ['It gives off visible light', 'It knows itself without needing another awareness to know it', 'It can only be seen in the dark', 'It must be activated through initiation'],
        correctIndex: 1,
        explanation: 'Self-luminous means awareness illuminates itself. You don\'t need a second awareness to be aware of awareness — it is self-evident.',
      },
    ],
    'nos-5': [
      {
        id: 'nos-5-1',
        question: 'The Cloud of Unknowing teaches that God is known through:',
        options: ['Theological study and logic', 'A "cloud of unknowing" — loving attention beyond concepts', 'Memorizing scripture', 'Following strict rules'],
        correctIndex: 1,
        explanation: 'This medieval Christian text teaches that the divine is approached not through the intellect but through a humble, loving attention that transcends all concepts.',
      },
      {
        id: 'nos-5-2',
        question: '"The Tao that can be spoken is not the true Tao" (Lao Tzu) suggests:',
        options: ['We should never talk about spiritual things', 'Ultimate reality transcends language and conceptual thought', 'The Tao is unknowable and there\'s no point trying', 'Only Chinese philosophy is valid'],
        correctIndex: 1,
        explanation: 'Lao Tzu\'s opening line points to the same truth found in Advaita and Christian mysticism: ultimate reality is beyond what words and concepts can capture.',
      },
    ],
    'nos-6': [
      {
        id: 'nos-6-1',
        question: 'The Ashtavakra Gita declares "You have always been free." This means:',
        options: ['Freedom is earned through lifetimes of effort', 'Freedom is your natural condition — bondage was imagined', 'Everyone achieves freedom eventually', 'Freedom only comes after death'],
        correctIndex: 1,
        explanation: 'The Ashtavakra Gita\'s radical teaching is that bondage was never real — it was only imagined through false identification. Freedom is what you are.',
      },
      {
        id: 'nos-6-2',
        question: 'The spiritual journey is ultimately described as:',
        options: ['A long climb to a distant peak', 'A homecoming — recognizing what was always here', 'An escape from the world', 'A competition between seekers'],
        correctIndex: 1,
        explanation: 'The journey is paradoxically a return to where you already are. It\'s not about going somewhere but about recognizing the awareness that is already present.',
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // NONDUALITY ACROSS TRADITIONS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  'nonduality-across': {
    'nac-1': [
      {
        id: 'nac-1-1',
        question: 'What do Brahman (Vedanta), Tao (Taoism), and Buddha-nature (Zen) have in common?',
        options: ['They are different gods in different religions', 'They point to the same non-dual reality using different cultural language', 'They are competing philosophical theories', 'They are all Indian concepts'],
        correctIndex: 1,
        explanation: 'Despite different cultural contexts, these terms all point to the same reality: an undivided, non-dual ground of being that transcends all distinctions.',
      },
      {
        id: 'nac-1-2',
        question: 'Why do mystics across traditions often say "words cannot capture it"?',
        options: ['They are being deliberately mysterious', 'Non-dual reality transcends the subject-object structure of language', 'They haven\'t tried hard enough to explain', 'It\'s a marketing technique'],
        correctIndex: 1,
        explanation: 'Language requires a subject and object (duality), but non-dual reality is prior to that split. Words can only point toward it, never fully capture it.',
      },
    ],
    'nac-2': [
      {
        id: 'nac-2-1',
        question: 'The Hindu "sakshi," the Zen "original face," and the Christian "still small voice" all refer to:',
        options: ['Different spiritual entities', 'The universal witness consciousness present in all traditions', 'Ancient historical figures', 'Different meditation techniques'],
        correctIndex: 1,
        explanation: 'Each tradition uses its own language, but all point to the same pure, witnessing awareness that is prior to thought and identity.',
      },
      {
        id: 'nac-2-2',
        question: 'Awareness is considered universal across traditions because:',
        options: ['All religions copied from each other', 'Direct investigation of consciousness leads to the same discovery regardless of culture', 'It\'s just a coincidence', 'The United Nations declared it so'],
        correctIndex: 1,
        explanation: 'When any human being looks deeply into the nature of their own awareness, they find the same thing: a witnessing presence that is prior to all content.',
      },
    ],
    'nac-3': [
      {
        id: 'nac-3-1',
        question: 'The Heart Sutra\'s "form is emptiness, emptiness is form" means:',
        options: ['Nothing exists', 'Appearances and their empty nature are inseparable — not two things', 'We should ignore the physical world', 'Only empty space is real'],
        correctIndex: 1,
        explanation: 'This is not nihilism. It means that phenomena (form) have no separate, independent existence (emptiness), and yet emptiness manifests as all phenomena — they are not two.',
      },
      {
        id: 'nac-3-2',
        question: 'Buddhist shunyata (emptiness) and Vedantic purna (fullness) appear opposite but:',
        options: ['One tradition is right and the other wrong', 'They describe the same reality from different angles — empty of separate self, full of awareness', 'They are completely unrelated ideas', 'They can never be reconciled'],
        correctIndex: 1,
        explanation: 'Shunyata (empty of inherent self-existence) and purna (full, complete awareness) are two ways of pointing to the same non-dual reality.',
      },
    ],
    'nac-4': [
      {
        id: 'nac-4-1',
        question: 'What do Vedanta\'s "anatman," Buddhism\'s "anatta," and Christianity\'s "dying to self" share?',
        options: ['Physical death rituals', 'The insight that the separate ego is not ultimately real', 'A belief in reincarnation', 'Ascetic self-punishment'],
        correctIndex: 1,
        explanation: 'All three traditions teach, in their own way, that the sense of being a separate, isolated self is the root illusion — and its dissolution reveals our true nature.',
      },
      {
        id: 'nac-4-2',
        question: 'Wu-wei in Taoism relates to ego dissolution by:',
        options: ['Teaching aggressive action', 'Showing that the best action flows from non-interference of the ego', 'Promoting complete inaction', 'Encouraging competition'],
        correctIndex: 1,
        explanation: 'Wu-wei (non-forcing) reveals that when the ego stops interfering, action becomes natural, effortless, and aligned with the Tao — the universal flow.',
      },
    ],
    'nac-5': [
      {
        id: 'nac-5-1',
        question: 'The path of love (bhakti) and the path of knowledge (jnana) ultimately:',
        options: ['Contradict each other', 'Lead to the same dissolution of the separate self', 'Are for different types of people who never understand each other', 'Are outdated approaches'],
        correctIndex: 1,
        explanation: 'Whether through the devotee\'s love dissolving into the Beloved, or the inquirer\'s knowledge dissolving the illusion of separation, both paths end in the same non-dual recognition.',
      },
      {
        id: 'nac-5-2',
        question: 'Rumi\'s poetry expresses non-duality through:',
        options: ['Logical philosophical arguments', 'The language of divine love — the lover dissolving into the Beloved', 'Scientific analysis', 'Political commentary'],
        correctIndex: 1,
        explanation: 'Rumi uses the metaphor of the lover and Beloved to express the dissolution of separation — when love is total, the boundary between lover and Beloved vanishes.',
      },
    ],
    'nac-6': [
      {
        id: 'nac-6-1',
        question: '"This very mind is Buddha" (Zen) and "Tat tvam asi — Thou art That" (Vedanta) both say:',
        options: ['You need to become something different', 'What you are seeking is already what you are', 'Only monks can understand this', 'Enlightenment is in the future'],
        correctIndex: 1,
        explanation: 'Both traditions declare that the truth is not somewhere else or in the future — it is the very awareness reading these words right now.',
      },
      {
        id: 'nac-6-2',
        question: 'The deepest teaching across all non-dual traditions is:',
        options: ['Practice harder and you\'ll get there someday', 'There is nothing to seek because you already are what you\'re seeking', 'Only one tradition has the full truth', 'Non-duality is just a theory'],
        correctIndex: 1,
        explanation: 'The paradox at the heart of all non-dual teaching: the seeker is the sought. You cannot become what you already are — only recognize it.',
      },
    ],
  },
};

/** Get quiz questions for a specific lesson, or null if no quiz exists */
export function getQuizForLesson(courseId: string, lessonId: string): QuizQuestion[] | null {
  return QUIZ_DATA[courseId]?.[lessonId] ?? null;
}
