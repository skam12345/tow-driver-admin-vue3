export default {
    namespaced: true,
    state : {
        // places : {
        //     pdaAddress: '',
        //     pdaAddressRoad: '',
        //     pdaIsFull: '',
        //     pdaLatitude: '',
        //     pdaLongitude: '',
        //     pdaName: '',
        //     pdaNo: '',
        //     pdaOperateCloseTime: '',
        //     pdaOperateOpenTime: '',
        //     pdaTel: ''
        // }
        places : [],
    },
    mutations: {
        GET_PLACES (state, payload) {
            state.places = payload
        }
    },
    actions: {
        setPlaces({commit}, places) {
            commit('GET_PLACES', places)
        }
    }

}