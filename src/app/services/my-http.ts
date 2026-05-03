import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class MyHttp {
  constructor() {}

  // Asynchronous method to perform HTTP GET requests
  async get(options: HttpOptions) {          // Calls CapacitorHttp.get()
    return await CapacitorHttp.get(options);  // Returns a promise with HTTP response
  }
  
}
