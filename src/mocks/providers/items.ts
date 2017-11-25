import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Pakistan",
    "profilePic": "http://flaglane.com/download/pakistani-flag/pakistani-flag-large.png",
    "about": "uchenik.",
  };


  constructor() {
    let items = [
      {
        "name": "india",
        "profilePic": "http://flaglane.com/download/indian-flag/indian-flag-large.png",
        "about": "Burt is a Bear."
      },
      {
        "name": "us",
        "profilePic": "http://flaglane.com/download/american-flag/american-flag-large.png",
        "about": "Charlie is a Cheetah."
      },
      {
        "name": "germany",
        "profilePic": "http://flaglane.com/download/german-flag/german-flag-large.png",
        "about": "Donald is a Duck."
      },
      {
        "name": "russian",
        "profilePic": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Russia.png",
        "about": "Eva is an Eagle."
      },
      {
        "name": "pakistan",
        "profilePic": "http://flaglane.com/download/pakistani-flag/pakistani-flag-large.png",
        "about": "Ellie is an Elephant."
      },
      {
        "name": "france",
        "profilePic": "assets/img/speakers/mouse.jpg",
        "about": "Molly is a Mouse."
      },
      {
        "name": "australia",
        "profilePic": "assets/img/speakers/puppy.jpg",
        "about": "Paul is a Puppy."
      }
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
