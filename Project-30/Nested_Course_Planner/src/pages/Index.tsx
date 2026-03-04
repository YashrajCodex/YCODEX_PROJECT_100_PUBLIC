import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { TreeNodeComponent } from "@/components/tree/TreeNodeComponent";
import { Button } from "@/components/ui/Button";
import { usePlans } from "@/context/PlanContext";
import { StudyNode } from "@/types/StudyNode";
import { findNodeById, deleteNode } from "@/lib/nodeUtils";
import { ArrowLeft } from "lucide-react";

export default function Index() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { currentPlan, updatePlan, setCurrentPlan } = usePlans();

  useEffect(() => {
    if (planId) {
      setCurrentPlan(planId);
    }
  }, [planId, setCurrentPlan]);

  const handleUpdateNode = (updatedNode: StudyNode) => {
    if (!currentPlan) return;
    updatePlan({ ...currentPlan, rootNode: updatedNode });
  };

  const handleDeleteNode = (nodeId: string) => {
    if (!currentPlan) return;
    const updatedRoot = { ...currentPlan.rootNode };
    if (deleteNode(updatedRoot, nodeId)) {
      updatePlan({ ...currentPlan, rootNode: updatedRoot });
    }
  };

  if (!currentPlan) {
    return (
      <Layout>
        <div className="container mx-auto p-6 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">No Plan Selected</h2>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-6 max-w-5xl">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {currentPlan.name}
          </h1>
        </div>
        
        <TreeNodeComponent
          node={currentPlan.rootNode}
          isRoot
          onUpdate={handleUpdateNode}
          onDelete={handleDeleteNode}
        />
      </div>
    </Layout>
  );
}
