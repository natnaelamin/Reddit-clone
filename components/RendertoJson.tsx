import {NodeHandler, TipTapRender, NodeHandlers} from "@troop.com/tiptap-react-render"

const doc: NodeHandler = (props) =>{
    return <>{props.children}</>
};

const paragraph: NodeHandler = (props) =>{
    return <p>{props.children}</p>
};

const text: NodeHandler = (props) =>{
    return <span>{props.node.text}</span>
}

const handlers: NodeHandlers = {
    doc: doc,
    text: text,
    paragraph: paragraph
};

function RenderToJson({data}: {data: any}) {
  return (
    <div>
      <TipTapRender handlers={handlers} node={data}/>
    </div>
  )
}

export default RenderToJson
