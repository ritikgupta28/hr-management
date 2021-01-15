export const initialState = {
	status: null,
	managerId: null,
	employeeId: null,
	isAuth: false,
	token: null
};

export const actionType = {
	SET_STATUS: "SET_STATUS",
	SET_IS_AUTH: "SET_IS_AUTH",
	SET_MANAGER_ID: "SET_MANAGER_ID",
	SET_EMPLOYEE_ID: "SET_EMPLOYEE_ID",
	SET_TOKEN: "SET_TOKEN"
};

const reducer = (state, action) => {
	switch (action.type) {
		case actionType.SET_STATUS: return { ...state, status: action.status };
		case actionType.SET_MANAGER_ID: return { ...state, managerId: action.managerId };
		case actionType.SET_EMPLOYEE_ID: return { ...state, employeeId: action.employeeId };
		case actionType.SET_IS_AUTH: return { ...state, isAuth: action.isAuth };
		case actionType.SET_TOKEN: return { ...state, token: action.token };
		default: return state;
	}
};

export default reducer;