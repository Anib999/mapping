import { GetCurrentLocationOfCollector, GetListOfCollectors, GetlocationofCollectorByDate } from '../constants/url';
import { fetch } from '../utils/httpUtil';

export const getLocationOfCollectorApi = async (data, successCallback) => {
    // return async dispatch => {
        try {
            const response = await fetch(`${GetlocationofCollectorByDate}?entrydate=${data.entrydate}&userId=${data.userId}`);
            if(response?.status === 200){
                successCallback(response?.data?.collectorLocation);
                // dispatch(response?.data)
            }
            else
                successCallback([])
        } catch (error) {
            
        }
    // }
}

export const getCurrentLocationOfCollectorApi = async (data, successCallback) => {
    // return async dispatch => {
        try {
            const response = await fetch(`${GetCurrentLocationOfCollector}?userId=${data.userId}`);
            if(response?.status === 200){
                successCallback(response?.data?.currentcollectorLocation);
                // dispatch(response?.data)
            }
            else
                successCallback([])
        } catch (error) {
            
        }
    // }
}

export const getListOfCollectorApi = async (successCallback) => {
    // return async dispatch => {
        try {
            const response = await fetch(`${GetListOfCollectors}`);
            if(response?.status === 200){
                successCallback(response?.data?.GetListOfCollectors);
                // dispatch(response?.data)
            }
            else
                successCallback([])
        } catch (error) {
            
        }
    // }
}