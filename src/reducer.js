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
                getLoading: true,
            };
        case "START_TRAINING":
            return {
                ...state,
            };
        case "UPDATE_LABEL":
            return {
                ...state,
                output: action.payload,
            };
        case "RUN":
            return {
                ...state,
            };
        case "STOP_TRAINING":
            return {
                ...state,
            };
        default:
            return state;
    }
}

export default Reducer;