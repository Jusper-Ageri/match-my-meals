import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  steps: string[];
  cookTime?: string;
  servings?: number;
  image?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  return (
    <Card 
      className="cursor-pointer transition-all duration-300 hover:shadow-hover hover:scale-[1.02] border-primary/10 group"
      onClick={onClick}
    >
      <CardHeader className="p-0">
        <div className="h-48 bg-gradient-to-br from-warmth to-cream rounded-t-lg relative overflow-hidden">
          {recipe.image ? (
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-spice/10 flex items-center justify-center">
              <div className="text-6xl opacity-50">🍽️</div>
            </div>
          )}
          {recipe.difficulty && (
            <Badge 
              className="absolute top-3 right-3 bg-background/90 text-foreground border-primary/20"
              variant="secondary"
            >
              {recipe.difficulty}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-3">
        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {recipe.title}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Main ingredients:</p>
          <div className="flex flex-wrap gap-1">
            {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="text-xs bg-herb/10 text-herb border-herb/20"
              >
                {ingredient}
              </Badge>
            ))}
            {recipe.ingredients.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{recipe.ingredients.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}