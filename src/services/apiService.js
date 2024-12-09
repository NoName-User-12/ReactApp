import config from '../utils/config';

export const getData = async () => {
    try {
        let data = null;
        if (config.IS_DEV) {
            const response = await fetch('./testData.json');
            data = await response.json();
        } else {
            const response = await fetch(`${config.API_BASE_URL}/endpoint`);
            data = await response.json();
        }
        console.log("Call get data");
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};
