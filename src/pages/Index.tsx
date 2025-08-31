import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IngredientSelector } from "@/components/IngredientSelector";
import { RecipeCard, Recipe } from "@/components/RecipeCard";
import { RecipeDetail } from "@/components/RecipeDetail";
import { RecipeSearch } from "@/components/RecipeSearch";
import heroImage from "@/assets/hero-image.jpg";
import { ChefHat, Sparkles, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { generateRecipesFromIngredients } from "@/services/recipeGenerator";

// Mock recipes for demonstration
const MOCK_RECIPES: Recipe[] = [
  {
    id: "1",
    title: "Chicken Stir-fry with Vegetables",
    ingredients: ["Chicken breast", "Bell peppers", "Onions", "Garlic", "Soy sauce", "Olive oil"],
    steps: [
      "Heat olive oil in a large pan over medium-high heat",
      "Add diced chicken breast and cook until golden brown",
      "Add sliced bell peppers and onions, stir-fry for 3-4 minutes",
      "Add minced garlic and cook for another minute",
      "Pour in soy sauce and stir to combine",
      "Serve hot over rice or noodles"
    ],
    cookTime: "20 mins",
    servings: 4,
    difficulty: "Easy"
  },
  {
    id: "2",
    title: "Garlic Herb Roasted Potatoes",
    ingredients: ["Potatoes", "Garlic", "Fresh herbs", "Olive oil", "Salt", "Pepper"],
    steps: [
      "Preheat oven to 425°F (220°C)",
      "Wash and dice potatoes into even pieces",
      "Toss potatoes with olive oil, minced garlic, and herbs",
      "Season with salt and pepper",
      "Roast for 25-30 minutes until golden and crispy",
      "Serve immediately while hot"
    ],
    cookTime: "35 mins",
    servings: 6,
    difficulty: "Easy"
  },
  {
    id: "3",
    title: "Fresh Tomato Basil Pasta",
    ingredients: ["Pasta", "Fresh tomatoes", "Basil", "Garlic", "Olive oil", "Parmesan cheese"],
    steps: [
      "Cook pasta according to package directions",
      "Heat olive oil in a large pan",
      "Add diced tomatoes and minced garlic",
      "Season with salt and pepper, cook until tomatoes break down",
      "Add fresh basil leaves and cooked pasta",
      "Toss with grated Parmesan cheese and serve"
    ],
    cookTime: "25 mins",
    servings: 4,
    difficulty: "Medium"
  }
];

const Index = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Filter recipes based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredRecipes(filtered);
    }
  }, [recipes, searchTerm]);

  const handleIngredientToggle = (ingredient: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleSuggestRecipes = async () => {
    if (selectedIngredients.length === 0) {
      toast({
        title: "No ingredients selected",
        description: "Please select some ingredients first!",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Use Hugging Face to generate recipes
      const aiRecipes = await generateRecipesFromIngredients(selectedIngredients);
      
      // Combine AI-generated recipes with mock recipes for variety
      const matchingMockRecipes = MOCK_RECIPES.filter(recipe =>
        recipe.ingredients.some(ingredient =>
          selectedIngredients.some(selected =>
            ingredient.toLowerCase().includes(selected.toLowerCase())
          )
        )
      );
      
      const allRecipes = [
        ...aiRecipes.map((recipe, index) => ({
          id: `ai-${index}`,
          title: recipe.title,
          ingredients: recipe.ingredients,
          steps: recipe.steps,
          cookTime: recipe.cookTime,
          servings: recipe.servings,
          difficulty: recipe.difficulty
        })),
        ...matchingMockRecipes
      ];
      
      setRecipes(allRecipes);
      
      toast({
        title: "AI Recipes Generated!",
        description: `Found ${allRecipes.length} delicious recipes using AI and our database.`,
      });
    } catch (error) {
      console.error('Error generating recipes:', error);
      
      // Fallback to mock recipes
      const matchingRecipes = MOCK_RECIPES.filter(recipe =>
        recipe.ingredients.some(ingredient =>
          selectedIngredients.some(selected =>
            ingredient.toLowerCase().includes(selected.toLowerCase())
          )
        )
      );
      
      setRecipes(matchingRecipes.length > 0 ? matchingRecipes : MOCK_RECIPES);
      
      toast({
        title: "Recipes Found!",
        description: `Found ${matchingRecipes.length > 0 ? matchingRecipes.length : MOCK_RECIPES.length} recipes from our database.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgradeToPremium = () => {
    toast({
      title: "Premium Upgrade",
      description: "Payment integration coming soon! This will redirect to checkout.",
    });
  };

  if (selectedRecipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-warmth to-cream">
        <div className="container mx-auto px-4 py-8">
          <RecipeDetail
            recipe={selectedRecipe}
            onBack={() => setSelectedRecipe(null)}
            onUpgradeToPremium={handleUpgradeToPremium}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-warmth to-cream">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Fresh ingredients for cooking"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-warmth/60"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ChefHat className="w-12 h-12 text-primary" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-spice bg-clip-text text-transparent">
                eChef
              </h1>
            </div>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Transform your available ingredients into amazing meals. eChef's AI-powered recipe matcher 
              finds the perfect dishes based on what you have at home.
            </p>
            
            <div className="flex items-center justify-center gap-8 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                AI-Powered Suggestions
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="w-4 h-4 text-spice" />
                Personalized Recipes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="space-y-8">
          {/* Ingredient Selection */}
          <IngredientSelector
            selectedIngredients={selectedIngredients}
            onIngredientToggle={handleIngredientToggle}
            onSuggestRecipes={handleSuggestRecipes}
            isLoading={isLoading}
          />

          {/* Recipe Results */}
          {recipes.length > 0 && (
            <Card className="shadow-card border-primary/10">
              <CardContent className="p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-2xl font-bold text-primary">
                    Suggested Recipes ({filteredRecipes.length})
                  </h2>
                  <RecipeSearch
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    placeholder="Search recipes or ingredients..."
                  />
                </div>

                {filteredRecipes.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <div className="text-4xl mb-4">🔍</div>
                    <p>No recipes found matching your search.</p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRecipes.map((recipe) => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onClick={() => setSelectedRecipe(recipe)}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Getting Started Message */}
          {recipes.length === 0 && selectedIngredients.length === 0 && (
            <Card className="shadow-card border-primary/10 bg-gradient-to-br from-card to-warmth">
              <CardContent className="p-8 text-center space-y-4">
                <div className="text-6xl mb-4">👨‍🍳</div>
                <h3 className="text-xl font-semibold text-foreground">Ready to Cook Something Amazing?</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Select the ingredients you have available above, and we'll find the perfect recipes for you!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
