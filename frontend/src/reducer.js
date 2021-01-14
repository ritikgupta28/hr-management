export const initialState = {
	error: null,
	status: null,
	isAdminAuth: false,
	isAuth: false,
	id: null,
	token: null
};

export const actionType = {
	SET_ERROR: "SET_ERROR",
	SET_STATUS: "SET_STATUS",
	SET_IS_ADMIN_AUTH: "SET_IS_ADMIN_AUTH",
	SET_IS_AUTH: "SET_IS_AUTH",
	SET_ID: "SET_ID",
	SET_TOKEN: "SET_TOKEN"
};

const reducer = (state, action) => {
	console.log(action);
	switch (action.type) {
		case actionType.SET_ERROR: return { ...state, error: action.error };
		case actionType.SET_STATUS: return { ...state, status: action.status };
		case actionType.SET_IS_ADMIN_AUTH: return { ...state, isAdminAuth: action.isAdminAuth };
		case actionType.SET_IS_AUTH: return { ...state, isAuth: action.isAuth };
		case actionType.SET_ID: return { ...state, id: action.id };
		case actionType.SET_TOKEN: return { ...state, token: action.token };
		default: return state;
	}
};

export default reducer;