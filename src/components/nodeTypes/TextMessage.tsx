import { Handle, Position } from "reactflow";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/20/solid";

function TextMessage({ data, selected }) {
  return (
    <div
      className={`${
        selected && "border-blue-700 border"
      } bg-black rounded-md drop-shadow-lg border-none`}
    >
      <Handle type="target" position={Position.Left} id="b" />
      <div
        className={`flex justify-between items-center bg-green-300 p-2 rounded-t-md min-w-48 w-full `}
      >
        <div className="flex gap-2">
          <ChatBubbleOvalLeftEllipsisIcon
            width="20px"
            height="20px"
            className="h-4 w-5"
          />
          <p className="text-xs font-semibold tracking-tight">Send Message</p>
        </div>
        <img
          width={"12px"}
          src={"/assets/whatsapp.png"}
          alt="icon"
          className="nodrag"
        />
      </div>

      <div className="bg-white rounded-b-md p-2">
        <p className="text-xs">{data?.value}</p>
      </div>
      <Handle type="source" position={Position.Right} id="a" />
    </div>
  );
}

export default TextMessage;
