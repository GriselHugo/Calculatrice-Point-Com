import axios from 'axios';

class Server {
  constructor() {
    this.server = axios.create({
      baseURL: 'http://localhost:4000',
    });
  }

  /* Add Calculation */

  addCalculation({ calculation, result }) {
    console.log(calculation, result);

    return this.server.post('/add', {
      calculation: calculation,
      result: result,
    });
  }

  /* Get Calculations */
  getCalculations() {
    return this.server.get('/getCalculations');
  }

  /* Delete Calculation */
  deleteCalculation({ id }) {
    return this.server.delete(`/${id}`);
  }

  /* Delete All Calculations */
  deleteAllCalculations() {
    return this.server.delete('/');
  }
}

const expressServer = new Server();
export default expressServer;
