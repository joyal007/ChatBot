import { ArrowLeftIcon } from "@heroicons/react/20/solid";

function SettingsPanel({
  selectedNode,
  handleInputChange,
  resetSelectedNode,
}: {
  selectedNode: { data: { label: string; value: string } } | null;
  handleInputChange: () => void;
  resetSelectedNode: () => void;
}) {
  return (
    <div className=" bg-white w-full col-span-2">
      <div className="flex px-4 py-2 border-b border-slate-300">
        <button onClick={resetSelectedNode}>
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <div className="flex w-full justify-center items-center ">
          <p>{selectedNode?.data.label}</p>
        </div>
      </div>
      <div className="p-2">
        <textarea
          rows={3}
          className="border border-slate-300 rounded-md w-full focus-visible:border-slate-300 focus:border-slate-300 p-2 "
          name={"value"}
          value={selectedNode?.data?.value}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default SettingsPanel;
