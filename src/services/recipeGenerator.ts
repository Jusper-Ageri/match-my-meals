import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

let textGenerator: any = null;

const initializeModel = async () => {
  if (!textGenerator) {
    console.log('Initializing Hugging Face text generation model...');
    textGenerator = await pipeline(
      'text-generation',
      'microsoft/DialoGPT-medium',
      { device: 'webgpu' }
    );
  }
  return textGenerator;
};

export interface GeneratedRecipe {
  title: string;
  ingredients: string[];
  steps: string[];
  cookTime: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
}

export const generateRecipesFromIngredients = async (ingredients: string[]): Promise<GeneratedRecipe[]> => {
  try {
    const generator = await initializeModel();
    
    const prompt = `Create a recipe using these ingredients: ${ingredients.join(', ')}. 
    Recipe format:
    Title: [Recipe Name]
    Ingredients: [List of ingredients]
    Steps: [Cooking steps]
    Cook Time: [Time in minutes]
    Servings: [Number of servings]
    Difficulty: [Easy/Medium/Hard]`;

    const result = await generator(prompt, {
      max_new_tokens: 300,
      temperature: 0.7,
      do_sample: true,
      repetition_penalty: 1.1,
    });

    // Parse the generated text into structured recipe data
    const generatedText = result[0]?.generated_text || '';
    
    // For now, return a single generated recipe with some parsing
    const recipe: GeneratedRecipe = {
      title: extractTitle(generatedText) || `Recipe with ${ingredients.slice(0, 2).join(' and ')}`,
      ingredients: ingredients,
      steps: extractSteps(generatedText) || generateBasicSteps(ingredients),
      cookTime: "25 mins",
      servings: 4,
      difficulty: "Medium" as const
    };

    return [recipe];
  } catch (error) {
    console.error('Error generating recipes with Hugging Face:', error);
    // Fallback to template-based generation
    return generateFallbackRecipes(ingredients);
  }
};

const extractTitle = (text: string): string | null => {
  const titleMatch = text.match(/Title:\s*(.+)/i);
  return titleMatch ? titleMatch[1].trim() : null;
};

const extractSteps = (text: string): string[] | null => {
  const stepsMatch = text.match(/Steps:\s*(.+)/is);
  if (stepsMatch) {
    return stepsMatch[1]
      .split(/\d+\.|\n-/)
      .filter(step => step.trim())
      .map(step => step.trim());
  }
  return null;
};

const generateBasicSteps = (ingredients: string[]): string[] => {
  return [
    `Prepare and wash all ingredients: ${ingredients.join(', ')}`,
    "Heat oil in a large pan over medium heat",
    `Add ${ingredients[0]} and cook until golden`,
    `Add remaining ingredients: ${ingredients.slice(1).join(', ')}`,
    "Season with salt and pepper to taste",
    "Cook until everything is tender and well combined",
    "Serve hot and enjoy!"
  ];
};

const generateFallbackRecipes = (ingredients: string[]): GeneratedRecipe[] => {
  const primaryIngredient = ingredients[0] || "mixed";
  
  return [{
    title: `AI-Generated ${primaryIngredient.charAt(0).toUpperCase() + primaryIngredient.slice(1)} Dish`,
    ingredients: ingredients,
    steps: generateBasicSteps(ingredients),
    cookTime: "30 mins",
    servings: 4,
    difficulty: "Easy" as const
  }];
};