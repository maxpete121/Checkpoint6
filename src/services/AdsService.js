import { AppState } from "../AppState"
import { Ads } from "../models/Ads"
import { api } from "./AxiosService"



class AdsService{

    async getAds(){
        let response = await api.get('api/ads')
        console.log(response)
        let allAds = response.data.map(ads => new Ads(ads))
        AppState.ads = allAds
    }
}

export const adsService = new AdsService()