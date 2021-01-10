export const initialState = {
	employees: []
};

export const actionType = {
	SET_EMPLOYEES: "SET_EMPLOYEES"
};

const reducer = (state, action) => {
	console.log(action);
	switch (action.type) {
		case actionType.SET_EMPLOYEES: 
		return {
			...state, 
			employees: action.employees
		};
		default:
		  return state;
	}
};

export default reducer;