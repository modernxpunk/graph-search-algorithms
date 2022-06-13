import { types } from "../utils/const"


const Cell = ({ type, makeWall }) => {
	return (
		<div className="board__cell" style={types[type].styles} onMouseDown={makeWall}></div>
	)
}

export default Cell