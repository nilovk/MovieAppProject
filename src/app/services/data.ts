import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class Data {

  // Inject services data storage
  constructor(private storage: Storage) {
    this.init();
  }

  // Asynchronous method to initialize the Storage engine
  async init() {
    await this.storage.create();
  }

   // Asynchronous method to store a key-value pair in the storage
  async set(key: string, value: any) {
    await this.storage.set(key, value);
  }

  // Asynchronous method to retrieve a value by its key from storage
  async get(key: string) {
    return await this.storage.get(key); // To get value corresponding to the key
  }
}
