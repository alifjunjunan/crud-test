import axios from "axios"

export const getDataAction = () => {
    return async (dispatch) => {
        try {
            let respon = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
            if (respon) {
                dispatch({
                    type: 'GET DATA SUCCESS',
                    payload: respon.data
                })
                // console.log('isi respon', respon.data)
                return {success: true, data: respon.data}
            }
        } catch (error) {
            console.log(error)
        }
    }
}