import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Users, ChefHat } from "lucide-react";
import { Recipe } from "./RecipeCard";

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onUpgradeToPremium: () => void;
}

export function RecipeDetail({ recipe, onBack, onUpgradeToPremium }: RecipeDetailProps) {
  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="flex items-center gap-2 text-primary hover:text-primary/80"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Recipes
      </Button>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-primary/10 shadow-card">
            <CardHeader className="p-0">
              <div className="h-64 bg-gradient-to-br from-warmth to-cream rounded-t-lg relative overflow-hidden">
                {recipe.image ? (
                  <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-spice/10 flex items-center justify-center">
                    <div className="text-8xl opacity-50">🍽️</div>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">{recipe.title}</h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  {recipe.cookTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {recipe.cookTime}
                    </div>
                  )}
                  {recipe.servings && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {recipe.servings} servings
                    </div>
                  )}
                  {recipe.difficulty && (
                    <div className="flex items-center gap-1">
                      <ChefHat className="w-4 h-4" />
                      {recipe.difficulty}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-primary/10 shadow-card">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recipe.steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-foreground leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="border-primary/10 shadow-card">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Ingredients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-herb rounded-full"></div>
                  <span className="text-foreground">{ingredient}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card className="border-spice/20 bg-gradient-to-br from-warmth to-cream shadow-card">
            <CardContent className="p-6 text-center space-y-4">
              <div className="text-4xl mb-2">⭐</div>
              <h3 className="font-bold text-lg text-foreground">Go Premium!</h3>
              <p className="text-sm text-muted-foreground">
                Unlock unlimited recipes, meal planning, and shopping lists!
              </p>
              <Button 
                variant="hero" 
                onClick={onUpgradeToPremium}
                className="w-full"
              >
                Upgrade Now - $9.99/month
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}