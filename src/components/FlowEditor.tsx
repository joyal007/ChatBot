import { useCallback, useState, useMemo } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import TextMessage from "./nodeTypes/TextMessage";

function FlowEditor() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const nodeTypes = useMemo(() => ({ textMessage: TextMessage }), []);

  const { screenToFlowPosition } = useReactFlow();

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => {
      setEdges((eds) => {
        // making sure only one edge originates from a source handle
        if (eds.find((ed) => ed.source === connection.source)) return eds;

        return addEdge(
          {
            ...connection,
            markerEnd: {
              type: MarkerType.Arrow,
            },
          },
          eds
        );
      });
    },
    [setEdges]
  );

  const onDropOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      const type = e.dataTransfer.getData("type");
      const label = e.dataTransfer.getData("label");
      const id = `${type}-${nodes.length + 1}`;
      const newNode = {
        id,
        type,
        position: screenToFlowPosition({ x: e.clientX, y: e.clientY }),
        data: { value: `message ${nodes.length + 1}`, label },
        origin: [0.5, 0.0],
      };
      if (type) {
        setNodes((nds) => nds.concat(newNode));
      }
    },
    [screenToFlowPosition, setNodes, nodes.length]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onDrop={onDrop}
      onDragOver={onDropOver}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default FlowEditor;
