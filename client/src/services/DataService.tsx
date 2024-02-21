const apiURL = 'http://localhost:5050';

const callApi = async (url: string, options: any) => {
    const result: any = {};
    try {
        // Fetch request
        const response = await fetch(url, options);
        result.code = response.status;

        switch(response.status) {
            case 200:
            case 201:
                result.body = await response.json();
                break;
            case 400:
            case 500:
                result.error = 'Something went wrong with your request';
                break;
            case 401:
                result.error = 'You are not permitted to perform this action';
                break;
        }
    } catch(error) {
        // Handle errors
        result.error = error;
    };
    
    return result;
}

const DataService = {

    GET: async (endpoint: string, headers={}) => {
        const options = {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                ...headers
              },
        };
        
        const url = `${apiURL}${endpoint}`;

        return callApi(url, options);
    },

    POST: async (endpoint: string, {headers={}, body={}}) => {
        const options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                ...headers
              },
              body
        };
        
        const url = `${apiURL}${endpoint}`;

        return callApi(url, options);
    }
}

export default DataService;
