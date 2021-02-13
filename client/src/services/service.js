import http from "../http-common";

class DataService {
  logIn() {
    return http.get(`/login`);
  }
  getSong() {
    return http.get(`/getTrack`);
  }
}

export default new DataService();
