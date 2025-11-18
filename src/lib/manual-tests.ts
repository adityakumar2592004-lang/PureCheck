export type ManualTest = {
  adulterant: string;
  test: string;
  explanation: string;
};

export type FoodItem = {
  name: string;
  tests: ManualTest[];
};

export const manualTestsData: Record<string, FoodItem[]> = {
  'fruits': [
    {
      name: 'Apples',
      tests: [
        {
          adulterant: 'Artificial Wax Coating',
          test: 'Take an apple and gently scrape its surface with a blunt knife or your fingernail. If a white, waxy, or flaky substance comes off, it might be an artificial coating. Natural wax is not easily scraped off in this manner.',
          explanation: 'Fruits like apples are often coated with wax to increase shelf life and improve appearance. While some wax is natural or food-grade, non-food-grade waxes like carnauba wax or shellac can be used, which may contain impurities harmful to health.'
        }
      ]
    },
    {
      name: 'Watermelon',
      tests: [
        {
          adulterant: 'Erythrosine Dye Injection',
          test: 'Cut a piece of watermelon and place it in a glass of water. If the water quickly turns pink or red, it indicates the presence of artificial dyes. A naturally ripened watermelon will not color the water immediately.',
          explanation: 'Erythrosine, a red dye, is sometimes injected into watermelons to make them appear riper and redder than they are. Consuming these dyes can lead to health issues.'
        }
      ]
    }
  ],
  'vegetables': [
    {
        name: 'Green Peas & Green Chillies',
        tests: [
            {
                adulterant: 'Malachite Green Dye',
                test: 'Take some green peas or chillies and place them on a piece of white blotting paper or cotton soaked in water. If the paper or cotton turns green, it indicates the presence of Malachite Green dye.',
                explanation: 'Malachite Green is a toxic chemical dye used to make vegetables look fresher and greener. It is a known carcinogen and is not permitted for use in food.'
            }
        ]
    },
    {
        name: 'Potatoes',
        tests: [
            {
                adulterant: 'Old potatoes sold as new',
                test: 'Gently rub the skin of the potato. The skin of a new potato is thin and peels off easily, whereas old potatoes have thicker, more firmly attached skin. Also, look for any green discoloration, which indicates the presence of solanine.',
                explanation: 'Old potatoes are sometimes treated and polished to be sold as fresh produce. Greenish potatoes contain solanine, a natural toxin that can cause nausea and headaches if consumed in large quantities.'
            }
        ]
    }
  ],
  'milk-and-dairy': [
    {
      name: 'Milk',
      tests: [
        {
          adulterant: 'Water',
          test: 'Put a drop of milk on a polished, slanting surface. Pure milk flows slowly, leaving a white trail behind it. Milk adulterated with water will flow down immediately without leaving a mark.',
          explanation: 'Adding water is the most common form of adulteration. It reduces the nutritional value of milk, particularly protein and fat content, simply to increase volume for profit.'
        },
        {
          adulterant: 'Detergent',
          test: 'Take 5 to 10 ml of milk in a test tube and add an equal amount of water. Shake the mixture vigorously for a few seconds. If it lathers up with a dense foam, it is adulterated with detergent.',
          explanation: 'Detergent is added to emulsify oil and water to create synthetic milk which looks like real milk. Consuming detergent can cause severe gastrointestinal problems and food poisoning.'
        }
      ]
    }
  ],
  'oils-and-fats': [
    {
        name: 'Coconut Oil',
        tests: [
            {
                adulterant: 'Other Oils',
                test: 'Take some coconut oil in a transparent glass and place it in the refrigerator for about 30 minutes. Pure coconut oil will solidify completely and uniformly. If other oils are present, they may form a separate liquid layer.',
                explanation: 'Cheaper oils are often mixed with coconut oil to increase profit margins. This reduces the quality and specific health benefits of pure coconut oil.'
            }
        ]
    },
    {
        name: 'Ghee / Butter',
        tests: [
            {
                adulterant: 'Vanaspati (Hydrogenated Vegetable Oil)',
                test: 'Take a teaspoon of melted ghee or butter in a transparent bottle. Add a pinch of sugar, close the lid, and shake well. Let it stand for five minutes. If a red color appears at the bottom, it is adulterated with vanaspati.',
                explanation: 'Vanaspati is much cheaper than pure ghee or butter and is used as an adulterant. It contains trans fats, which are associated with an increased risk of heart disease.'
            }
        ]
    }
  ],
  'pulses-and-grains': [
    {
        name: 'Rice',
        tests: [
            {
                adulterant: 'Plastic Rice',
                test: 'Take a small quantity of rice and burn it. If it smells like burning plastic, it is adulterated. Alternatively, drop some grains into hot oil; plastic rice will melt and stick together.',
                explanation: 'Plastic rice, made from plastics like polystyrene, is a dangerous adulterant that can cause severe digestive issues and hormonal imbalances. It is designed to mimic the appearance of real rice.'
            }
        ]
    }
  ],
  'spices': [
    {
      name: 'Turmeric Powder',
      tests: [
        {
          adulterant: 'Metanil Yellow',
          test: 'Take a pinch of turmeric powder in a test tube. Add a few drops of concentrated hydrochloric acid. If a magenta or violet color appears, it indicates the presence of Metanil Yellow.',
          explanation: 'Metanil Yellow is a non-permitted, synthetic food color used to enhance the yellow color of turmeric. It is a known neurotoxin and can cause damage to the stomach, liver, and other organs.'
        },
        {
          adulterant: 'Chalk Powder',
          test: 'Stir a teaspoon of turmeric powder in a glass of water. Let it settle. Pure turmeric will leave a pale yellow color while settling down. Chalk powder will cause the water to become cloudy and will form a white sediment at the bottom.',
          explanation: 'Chalk powder or yellow soapstone powder is added as a bulking agent to increase the weight of the turmeric powder, reducing its quality and potency.'
        }
      ]
    },
    {
        name: 'Red Chilli Powder',
        tests: [
            {
                adulterant: 'Brick Powder / Artificial Colors',
                test: 'Sprinkle a small amount of chilli powder on the surface of a glass of water. Natural chilli powder will slowly settle, leaving a faint color trail. Artificial colors will immediately streak down, and brick powder will settle at the bottom as a gritty sediment.',
                explanation: 'Brick powder, sand, and artificial dyes like Sudan Red are added to improve color and increase weight. These are toxic and can cause stomach ailments and cancer.'
            }
        ]
    }
  ]
};
