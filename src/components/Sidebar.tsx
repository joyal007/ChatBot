//@ts-nocheck
import { useCallback, useState } from "react";
import { useReactFlow, useOnSelectionChange } from "reactflow";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";

function Sidebar() {
  const { setNodes } = useReactFlow();
  const [selectedNode, setSelectedNode] = useState(null);

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      setSelectedNode(() => {
        const [node] = nodes.filter((nde) => nde.selected);
        console.log(node);
        return node || null;
      });
    },
  });

  const handleInputChange = useCallback(
    (e) => {
      if (!selectedNode?.id) return;

      setSelectedNode((prev) => ({
        ...prev,
        data: { ...prev.data, value: e?.target?.value },
      }));
      setNodes((nds) => {
        return nds?.map((nd) => {
          if (nd?.id === selectedNode?.id) {
            return { ...nd, data: { ...nd.data, value: e?.target?.value } };
          }
          return nd;
        });
      });
    },
    [setNodes, setSelectedNode, selectedNode?.id]
  );

  const resetSelectedNode = useCallback(() => {
    setSelectedNode(null);
    setNodes((nds) => {
      return nds?.map((nd) => {
        if (nd?.id === selectedNode?.id) {
          return { ...nd, selected: false };
        }
        return nd;
      });
    });
  }, [setSelectedNode, setNodes, selectedNode?.id]);

  return (
    <div className=" border border-slate-300 w-96 h-full">
      {selectedNode ? (
        <SettingsPanel
          selectedNode={selectedNode}
          resetSelectedNode={resetSelectedNode}
          handleInputChange={handleInputChange}
        />
      ) : (
        <NodesPanel />
      )}
    </div>
  );
}

export default Sidebar;
