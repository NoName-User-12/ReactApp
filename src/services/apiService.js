import config from '../utils/config';

export const api = {
    getData: async () => {
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
    },
    getMinMaxAmout:  async () => {
        try {
            let rs = {
                min: 0,
                max: 1
            };
            let data = null;
            if (config.IS_DEV) {
                const response = await fetch('./testData.json');
                data = await response.json();
            } else {
                const response = await fetch(`${config.API_BASE_URL}/endpoint`);
                data = await response.json();
            }
            if (data) {
                let amounts = data.map(tx => tx.amount);
                rs.min = Math.min(...amounts);
                rs.max = Math.max(...amounts);
            }
            return rs;
        } catch (error) {
            console.error("Error fetching data:", error);
            return null;
        }
    }
}
