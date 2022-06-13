export const types = {
	'empty': {
		styles: {
			backgroundColor: "white"
		},
		text: {
			title: "empty"
		}
	},
	's': {
		styles: {
			backgroundColor: "green"
		},
		text: {
			title: "start"
		}
	},
	"e": {
		styles: {
			backgroundColor: "red"
		},
		text: {
			title: "end"
		}
	},
	'notEmpty': {
		styles: {
			backgroundColor: "yellow"
		},
		text: {
			title: "passed"
		}
	},
	"path": {
		styles: {
			backgroundColor: "grey"
		},
		text: {
			title: "path"
		}
	},
	"wall": {
		styles: {
			backgroundColor: "black"
		},
		text: {
			title: "wall"
		}
	}
}

export const isTarget = (target, cell) => target[0] === cell[0] && target[1] === cell[1]

export const search = (arr, x) => {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i][0] === x[0] && arr[i][1] === x[1]) {
			return true
		}
	}
	return false
}

// const get4directions = cell => {
// 	const [x, y] = cell
// 	return [
// 		[x - 1, y], [x + 1, y],
// 		[x, y - 1], [x, y + 1]
// 	]
// }

export const get4directions = cell => {
	const [x, y] = cell
	return [
		[x - 1, y], [x + 1, y],
		[x, y - 1], [x, y + 1],
		[x - 1, y - 1], [x - 1, y + 1],
		[x + 1, y - 1], [x + 1, y + 1]

	]
}

