import { nodeTypes } from '../utils/nodeTypes'
import DraggableNode from './DraggableNode'

function NodesPanel() {
    return (
        <div className='grid grid-cols-2 auto-rows-auto gap-2 p-2'>

            {nodeTypes.map((nodeType, idx) => { return <DraggableNode key={idx} {...nodeType} /> })}
        </div>
    )
}

export default NodesPanel