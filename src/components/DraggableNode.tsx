import { useCallback, useState } from "react";

function DraggableNode({
  type,
  label,
  Icon,
}: {
  type: string;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}) {
  const [dragging, setDragging] = useState(false);

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      setDragging(true);

      const target = e.target as HTMLDivElement;

      e.dataTransfer.setData("type", target.getAttribute("data-type") || "");
      e.dataTransfer.setData("label", target.getAttribute("data-label") || "");
    },
    [setDragging]
  );

  const handleDragEnd = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  return (
    <div
      data-type={type}
      data-label={label}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      draggable={true}
      className={`bg-white border-blue-900  border-2 px-20 py-4 rounded-md h-fit ${
        dragging ? "cursor-grabbing" : "cursor-pointer"
      }`}
    >
      <div className="flex flex-col justify-center items-center pointer-events-none">
        <Icon width="32px" height="48px" className="h-8  max-w-none" />
        <p className="text-xs mt-2">{label}</p>
      </div>
    </div>
  );
}

export default DraggableNode;
