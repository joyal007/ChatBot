import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import FlowEditor from "./components/FlowEditor";
import { Toaster } from "./components/ui/toaster";
import { ReactFlowProvider } from "reactflow";

function Flow() {
  return (
    <ReactFlowProvider>
      <div className="h-screen flex flex-col bg-white">
        <Navbar />
        <div className="h-full w-screen flex">
          <FlowEditor />
          <Sidebar />
        </div>
        <Toaster />
      </div>
    </ReactFlowProvider>
  );
}

export default Flow;
