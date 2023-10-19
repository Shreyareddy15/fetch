 // models/Location.js
 export default class Location {
    constructor(zip_code, latitude, longitude, city, state, county) {
      this.zip_code = zip_code;
      this.latitude = latitude;
      this.longitude = longitude;
      this.city = city;
      this.state = state;
      this.county = county;
    }
  }