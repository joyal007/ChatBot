import { useCallback } from "react";
import { useReactFlow } from "reactflow";
import { useToast } from "./ui/use-toast";

function Navbar() {
  const { toast } = useToast();
  const { getNodes, getEdges } = useReactFlow();
  const saveHandler = useCallback(() => {
    const nodes = getNodes();
    const edges = getEdges();
    const nodesWithTargetHandle = edges.reduce((acc, edge) => {
      if (!acc.find((nd) => nd.id === edge.target)) {
        acc.push(nodes.find((nd) => nd.id === edge.target));
      }
      return acc;
    }, []);

    // error if there are more than one Node has empty target handles
    if (nodes.length - nodesWithTargetHandle.length > 1) {
      toast({
        description: "Cannot save flow",
        variant: "destructive",
      });
    } else {
      toast({
        description: "Flow saved successfully",
      });
    }
  }, [getEdges, getNodes, toast]);

  return (
    <div className="bg-slate-200 flex justify-end w-full py-2 px-4">
      <button
        className="py-2 px-6 bg-white rounded-md border-blue-900 text-sm text-blue-900 border-2"
        onClick={saveHandler}
      >
        Save Changes
      </button>
    </div>
  );
}

export default Navbar;
