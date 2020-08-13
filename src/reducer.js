const initialState = {
    output: "",
    isLoading: false,
    label: "",
}


function Reducer(state = initialState, action) {
    switch (action.type) {
        case "LOADMODELS":
            return {
                ...state,
                isLoading: true,
            };
        case "START_TRAINING":
            return {
                ...state,
            };
        case "UPDATE_OUTPUT":
            return {
                ...state,
                output: action.payload,
            };
        case "RUN":
            return {
                state,
            };
        case "STOP_TRAINING":
            return {
                state,
            };
        case "STOP_RUN":
            return {
                ...state,
                output: action.payload
            };
        default:
            return state;
    }
}

export default Reducer;