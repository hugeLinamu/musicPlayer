import { useSettingStore,useDataStore} from '../index'

const useStttings = useSettingStore()
const useData = useDataStore()
export default function (){
    localStorage.setItem('settings',JSON.stringify(useStttings.settings))
    localStorage.setItem('data',JSON.stringify(useData.data))
}