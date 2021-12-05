const URL= 'https://api.spaceflightnewsapi.net/v3'
export async function fetchFlights() {
   try {
      const response = await fetch(`${URL}/articles?_limit=100`);
      const data = await response.json();
      return data;
   } catch (error) {
      console.log(error);       
   }
}