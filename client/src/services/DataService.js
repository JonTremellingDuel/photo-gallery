const apiURL = 'http://localhost:5050';

const DataService = {

    GET: async (endpoint, headers={}) => {
        const options = {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                ...headers
              },
        };
        
        const url = `${apiURL}${endpoint}`;

        console.log(options)
        try {
            // Fetch request
            const response = await fetch(url, options);
            return response.json();
        } catch(error) {
            // Handle errors
            return error;
        };
    },

    POST: async (endpoint, {headers={}, body={}}) => {
        const options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                ...headers
              },
              body
        };
        
        const url = `${apiURL}${endpoint}`;

        console.log(options)
        try {
            // Fetch request
            const response = await fetch(url, options);
            return response.json();
        } catch(error) {
            // Handle errors
            return error;
        };
    }
}

export default DataService;
