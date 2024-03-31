import axios from 'axios';


const ShazamAPI = {
    search: async (query) => {
      try {
        const response = await axios.get('https://shazam.p.rapidapi.com/search', {
          params: { term: query },
          headers: {
            'x-rapidapi-host': 'shazam.p.rapidapi.com',
            'x-rapidapi-key': '69aeee2797msh9107bea1f2f8b15p1254f4jsnc3603a5f76e7',
          },
        });

        console.log(response);
  
        return response.data;
      } catch (error) {
        console.error('Error calling Shazam API:', error);
        throw error;
      }
    },
  };

export default ShazamAPI;