export const feedbackTypes = {
  'BUG': {
    title: 'Problema',
    image: require('../assets/bug.png'),
  },
  'IDEIA': {
    title: 'Ideia',
    image: require('../assets/idea.png'),
  },
  'OTHER': {
    title: 'Outro',
    image: require('../assets/thought.png'),
  },
};

export type FeedbackType = keyof typeof feedbackTypes;
