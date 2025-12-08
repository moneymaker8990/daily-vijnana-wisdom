/**
 * Paths to Liberation - Comparative Study
 * 
 * How different traditions describe freedom: Moksha, Nirvana, Salvation,
 * Return to Tao. Compare and contrast ultimate goals across traditions.
 */

import type { Course } from '../../types';

export const pathsToLiberationCourse: Course = {
  id: 'paths-to-liberation',
  title: 'Paths to Liberation',
  description: 'Every tradition promises freedom—but from what? To what? Compare Vedantic moksha, Buddhist nirvana, Christian salvation, and the Taoist return to Source. Discover what unites and distinguishes these ultimate goals.',
  icon: '🗝️',
  pathwayType: 'comparative',
  difficulty: 2,
  estimatedWeeks: 3,
  lessons: [
    {
      id: 'ptl-1',
      title: 'The Universal Promise',
      introduction: `Every spiritual tradition promises liberation—freedom from suffering, union with truth, return to our original nature. But the language differs dramatically: Hindus speak of moksha (liberation from the cycle of rebirth), Buddhists of nirvana (cessation of suffering), Christians of salvation (eternal life with God), Taoists of returning to the Source.

Are these the same thing described differently, or genuinely different goals? This course explores both the convergences and the distinctions.

What unites them: each tradition agrees we are somehow bound, limited, or lost—and that there is a way home. The Brihadaranyaka Upanishad prays: "Lead me from death to immortality." The Buddha offers an end to suffering. Jesus says: "You will know the truth, and the truth will set you free."`,
      verses: [
        'brihad-1',    // "Lead me from death to immortality"
        'dp-7-1',      // "No suffering for one who has finished the journey"
        'tao-16',      // "Returning to the source is stillness"
        'cob-27',      // "When you are lost, you are found"
      ],
      traditionalContext: 'Each tradition recognizes a fundamental problem—bondage, suffering, separation, loss of the Way—and offers a path to resolution. The specific understanding of both problem and solution shapes the entire spiritual path.',
      reflectionQuestions: [
        'What do you most want to be free from?',
        'What would liberation look like in your life?',
        'Can different traditions describe the same freedom?',
      ],
      practice: {
        title: 'Recognizing Bondage',
        duration: '15 minutes',
        instructions: [
          'Sit quietly and ask yourself: "Where am I not free?"',
          'Notice what arises: fear, attachment, confusion, habit.',
          'Don\'t try to fix it—just see it clearly.',
          'Ask: "What would freedom look like here?"',
          'Notice: the desire for freedom itself is a sign of possibility.',
          'Rest in the recognition that liberation is sought across all traditions.',
          'Whatever binds you, there is a way through.',
        ],
      },
    },
    {
      id: 'ptl-2',
      title: 'Moksha: Liberation in Vedanta',
      introduction: `In Hindu philosophy, moksha is liberation from samsara—the cycle of death and rebirth. But more fundamentally, it is liberation from ignorance: the false belief that we are separate, limited beings.

The Ashtavakra Gita declares: "You are indeed ever free." Moksha is not becoming free but recognizing you were never bound. The bondage was imaginary—a case of mistaken identity.

"You are neither earth, nor water, nor fire, nor air, nor space. To be liberated, know yourself as consciousness itself, the witness of all these." Liberation is jnana (knowledge)—not intellectual knowledge, but direct recognition of your true nature as the infinite Self.`,
      verses: [
        'ashtavakra-1-6', // "You are indeed ever free"
        'ashtavakra-1-3', // "You are neither earth, nor water..."
        'chandogya-2',    // "Tat tvam asi—That thou art"
        'ashtavakra-2-19', // "For me there is neither bondage nor liberation"
      ],
      traditionalContext: 'Vedantic moksha is the recognition that Atman (individual self) is Brahman (ultimate reality). Since you were never separate from Brahman, there is nothing to achieve—only ignorance to dispel. This is a non-dualistic understanding of liberation.',
      reflectionQuestions: [
        'What would change if you discovered you were already free?',
        'Is bondage real or imagined?',
        'Who is the one that seems to be bound?',
      ],
      practice: {
        title: 'Self-Inquiry',
        duration: '20 minutes',
        instructions: [
          'Sit quietly and ask: "Who am I?"',
          'Let answers arise: I am my body, my thoughts, my roles.',
          'For each answer, ask: "Am I this, or do I perceive this?"',
          'Continue until no object can be identified as you.',
          'What remains when all objects are seen as "not I"?',
          'This awareness that cannot be objectified is what you are.',
          'Rest here. You have never been anything else.',
        ],
      },
    },
    {
      id: 'ptl-3',
      title: 'Nirvana: The Blowing Out',
      introduction: `The Buddhist goal of nirvana literally means "blowing out" or "extinction"—the extinguishing of the fires of craving, aversion, and delusion. It is not annihilation of self but cessation of the causes of suffering.

The Heart Sutra points to nirvana's nature: "Without any hindrance, no fears exist. Far apart from every perverted view, one dwells in nirvana." Nirvana is peace beyond the turbulence of conditioned existence.

Unlike Vedantic moksha, Buddhism does not posit an eternal Self to be realized. The Diamond Sutra says: "The notion of a self... does not exist in any real sense." Liberation is from the very idea of a substantial self.`,
      verses: [
        'heart-9',     // "Without any hindrance, no fears exist. One dwells in nirvana"
        'dp-7-1',      // "No suffering for one who has finished the journey"
        'heart-8',     // "No cognition, also no attainment, with nothing to attain"
        'diamond-6',   // "The notion of a self does not exist in any real sense"
      ],
      traditionalContext: 'Buddhist nirvana is the cessation of craving and the suffering it causes. It is described negatively—what it is not—because it transcends concepts. The Buddha famously remained silent about metaphysical questions, focusing on the practical end of suffering.',
      reflectionQuestions: [
        'What would remain if craving completely ceased?',
        'How is nirvana different from moksha?',
        'Can liberation be achieved, or only recognized?',
      ],
      practice: {
        title: 'Tasting Cessation',
        duration: '15 minutes',
        instructions: [
          'Sit quietly and observe craving as it arises.',
          'Notice wanting: wanting comfort, wanting insight, wanting peace.',
          'For this moment only, let craving cease.',
          'Don\'t push it away—simply don\'t feed it.',
          'Notice the peace that arises when craving stops.',
          'This peace is always available.',
          'The fires go out on their own when fuel is not added.',
        ],
      },
    },
    {
      id: 'ptl-4',
      title: 'Salvation: Christian Liberation',
      introduction: `Christian salvation is deliverance from sin and death into eternal life with God. Unlike Eastern liberation, it often emphasizes relationship rather than identity—the soul is saved by God, united with God, but remains distinct.

Yet the Christian mystics speak in terms that echo non-dual traditions. St. John of the Cross writes: "The soul becomes God by participation. Though remaining distinct in its being, it becomes one with God in love."

The Cloud of Unknowing suggests: "Whenever you feel that you are in no way doing anything, you are closest to God." Here, salvation is not future but present—available now through contemplative union.`,
      verses: [
        'dn-4-1',      // "The soul becomes God by participation"
        'cloud-26',    // "When you feel you are doing nothing, closest to God"
        'ioc-2-1',     // "The kingdom of God is within you"
        'dn-4-3',      // "The soul has become so united with God"
      ],
      traditionalContext: 'Christian salvation includes both "already" and "not yet" dimensions—union with God is available now in contemplation, yet fullness awaits eschatologically. The mystics emphasize the present availability of divine union.',
      reflectionQuestions: [
        'Is salvation something that happens after death or can be tasted now?',
        'How do union and distinction coexist in Christian mysticism?',
        'What would it mean to become God by participation?',
      ],
      practice: {
        title: 'Resting in God',
        duration: '20 minutes',
        instructions: [
          'Sit in stillness and surrender to God\'s presence.',
          'You don\'t need to find God—God has found you.',
          'Let yourself be loved, held, embraced.',
          'There is nothing to achieve—only to receive.',
          'Say inwardly: "Not my will, but yours."',
          'Rest in this surrender. This is salvation now.',
          'You are already home in God.',
        ],
      },
    },
    {
      id: 'ptl-5',
      title: 'Return to the Source: Taoist Liberation',
      introduction: `Taoism speaks not of liberation from something but return to something—the Source, the Tao, the natural way. "Returning to the source is stillness, which is the way of nature."

The Tao is not a deity to worship or a self to discover but the natural order underlying all things. Liberation is aligning with this order, living in harmony with the flow. "Without going out, you may know the world. Without looking through the window, you may see the way of heaven."

This is the gentlest of liberations—not escaping the world but coming home to it, finding freedom not elsewhere but here, in ordinary life lived naturally.`,
      verses: [
        'tao-16',      // "Returning to the source is stillness"
        'tao-47',      // "Without going out, you may know the world"
        'zz-6-6',      // "Enter the realm where there is no life and no death"
        'tao-28',      // "Return to the state of the uncarved block"
      ],
      traditionalContext: 'Taoist liberation is natural and effortless. It is not transcendence of the world but harmonious dwelling within it. The sage returns to simplicity, to the original uncarved block, to spontaneous alignment with the Way.',
      reflectionQuestions: [
        'What would it mean to return to your source?',
        'Is liberation escape from the world or peace within it?',
        'Can ordinary life itself be the goal?',
      ],
      practice: {
        title: 'Returning Home',
        duration: '15 minutes',
        instructions: [
          'Sit in stillness and feel yourself settling.',
          'Let thoughts rise and fall like waves.',
          'You are the stillness beneath the waves.',
          'This stillness is the source. You are always returning.',
          'There is nowhere to go. You are already here.',
          'Rest in naturalness. This is the Tao.',
          'Liberation is not going somewhere but being here.',
        ],
      },
    },
    {
      id: 'ptl-6',
      title: 'One Freedom, Many Doors',
      introduction: `Having explored four paths to liberation, what can we conclude? Perhaps the traditions describe the same essential freedom in different languages, shaped by different cultures and concerns. Perhaps they describe genuinely different destinations.

Or perhaps, most subtly, they describe the same freedom emphasized differently: Vedanta's focus on identity (you are Brahman), Buddhism's focus on cessation (suffering ends), Christianity's focus on relationship (union with God), Taoism's focus on harmony (flow with nature).

What unites them: each points beyond the ordinary ego-bound existence. Each promises peace, freedom, fulfillment. Each requires some form of letting go. The door you enter may matter less than the willingness to pass through.`,
      verses: [
        'ashtavakra-5-4', // "You are complete, even now"
        'mumon-30',       // "This very mind is Buddha"
        'cloud-1',        // "By love He can be grasped"
        'tao-1',          // "The Tao that can be told is not the eternal Tao"
      ],
      traditionalContext: 'The perennial philosophy suggests that mystics of all traditions arrive at the same truth. Others argue the differences are substantial. Perhaps both perspectives contain wisdom: the goal is one, but the paths are many, and each path shapes the experience of arrival.',
      reflectionQuestions: [
        'Do these traditions describe one freedom or many?',
        'Which path resonates most with you, and why?',
        'Is there a door that calls you to enter?',
      ],
      practice: {
        title: 'Stepping Through',
        duration: '15 minutes',
        instructions: [
          'Sit in stillness and contemplate the four paths.',
          'Which speaks to your heart? Identity? Cessation? Love? Harmony?',
          'Hold your resonance lightly—it is a door, not a cage.',
          'Whatever door you enter, the same freedom awaits.',
          'For now, simply be here—already free, always free.',
          'The door is open. You have always been inside.',
          'Rest in this recognition.',
        ],
      },
    },
  ],
};

