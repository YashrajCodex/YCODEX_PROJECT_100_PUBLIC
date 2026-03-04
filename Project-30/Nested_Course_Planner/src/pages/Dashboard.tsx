import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import { usePlans } from "@/context/PlanContext";
import { calculateProgress } from "@/lib/progress";
import { BookOpen, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { plans, setCurrentPlan } = usePlans();
  const navigate = useNavigate();

  const handleOpenPlan = (planId: string) => {
    setCurrentPlan(planId);
    navigate(`/plan/${planId}`);
  };

  return (
    <Layout>
      <div className="container mx-auto p-8 flex flex-col gap-3">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Dashboard 
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 animate-fade-in">
          {plans.map(plan => {
            const progress = calculateProgress(plan.rootNode);
            
            return (
              <Card key={plan.id} className="p-4 hover:scale-105 transition-transform">
                <div className="flex items-start justify-between">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <span className="text-xs text-muted-foreground">
                    {new Date(plan.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-foreground mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-2xl font-bold text-primary">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} glow className="mb-4" />
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleOpenPlan(plan.id)}
                  className="w-full group"
                >
                  Open Plan 
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
