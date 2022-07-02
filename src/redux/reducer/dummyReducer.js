const INITIAL_STATE = {
    dataList: []
}

export const dummyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET DATA SUCCESS':
            return {
                ...state,
                dataList: action.payload
            }
    
        default:
            return state;
    }
}