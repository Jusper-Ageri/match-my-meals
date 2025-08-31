import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const COMMON_INGREDIENTS = [
  "Chicken", "Beef", "Pork", "Fish", "Eggs", "Rice", "Pasta", "Potatoes",
  "Onions", "Garlic", "Tomatoes", "Bell Peppers", "Carrots", "Broccoli",
  "Spinach", "Mushrooms", "Cheese", "Milk", "Olive Oil", "Salt", "Pepper",
  "Basil", "Oregano", "Thyme", "Parsley", "Lemon", "Butter", "Flour",
  "Bread", "Lettuce", "Cucumber", "Avocado"
];

interface IngredientSelectorProps {
  selectedIngredients: string[];
  onIngredientToggle: (ingredient: string) => void;
  onSuggestRecipes: () => void;
  isLoading?: boolean;
}

export function IngredientSelector({ 
  selectedIngredients, 
  onIngredientToggle, 
  onSuggestRecipes,
  isLoading = false 
}: IngredientSelectorProps) {
  return (
    <Card className="shadow-card border-primary/10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          Select Your Ingredients
        </CardTitle>
        <p className="text-muted-foreground">
          Choose the ingredients you have available, and we'll suggest delicious recipes!
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {COMMON_INGREDIENTS.map((ingredient) => {
            const isSelected = selectedIngredients.includes(ingredient);
            return (
              <Button
                key={ingredient}
                variant="warm"
                size="sm"
                onClick={() => onIngredientToggle(ingredient)}
                className={`h-auto py-3 px-4 justify-start relative ${
                  isSelected 
                    ? "bg-primary/10 border-primary text-primary hover:bg-primary/15" 
                    : ""
                }`}
              >
                {isSelected && (
                  <Check className="w-4 h-4 mr-2 text-primary" />
                )}
                {ingredient}
              </Button>
            );
          })}
        </div>
        
        {selectedIngredients.length > 0 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Selected Ingredients:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedIngredients.map((ingredient) => (
                  <Badge 
                    key={ingredient} 
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Button
              variant="hero"
              size="lg"
              onClick={onSuggestRecipes}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? "Finding Recipes..." : "🍳 Suggest Recipes"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}