interface JustShowItUnitInterface {
  setUuid(uuid?: string): void;
  getUuid(): string;
  setType(type?: string): void;
  getType(): string;
  setCreationDate(): void;
  getCreationDate(): Date;
  getUnitAsJson(): JSON;
  setParam(index: string, value: string): void;
  getParam(index: string): string;
}

import uuidv1 from 'uuid/v1';

export default class JustShowItUnit implements JustShowItUnitInterface {

  private json: JSON;

  // private availableComponentTypes: Array<string> = ["list", "text", "video", "link", "image", "article" ];
  // private availableParams: Array<string> = ["text", "title", "description", "url", "resolution", "runtime", "size", "author"];

  private uuid: string = uuidv1();
  private type: string = 'unit';
  private creationDate: Date = new Date();
  private params: Object = {};
  private units: JustShowItUnit[] = [];
  
  constructor(json: JSON) {
    this.json = json;

    this.setUuid(uuidv1());
    this.setCreationDate();

    if (Array.isArray(this.json) && this.json.length) {
      for (let index in this.json) {
        let unit = new JustShowItUnit(this.json[index]);
        this.units.push(unit);
      }
    }
    
    if (typeof this.json === 'object' && Object.keys(this.json).length) {
      console.log("");
      console.log("OBJECT");
      console.log(this.json);
      this.units.push(new JustShowItUnit(this.json));    
    }

    if (typeof this.json === 'string') {
      this.setType("text");
      this.setParam("text", this.json);
    }
    
  }

  setUuid(uuid: string): void {
    if (uuid) {
      this.uuid = uuid;
    }
    if (this.json.hasOwnProperty('uuid')) {
      this.uuid = this.json['uuid'];
    }
  }
  
  getUuid(): string {
    return this.uuid;
  }

  setType(type?: string): void {
    if (type) {
      this.type = type;
    }
    if (this.json.hasOwnProperty('type')) {
      this.type = this.json['type'];
    }
  }
  
  getType(): string {
    return this.type;
  }

  setCreationDate(): void {
    if (this.json.hasOwnProperty('creationDate')) {
      this.creationDate = this.json['creationDate'];
    }
  }
  
  getCreationDate(): Date {
    return this.creationDate;
  }

  getUnitAsJson(): JSON {
    let unit: any = {
      id: this.getUuid(),
      type: this.getType(),
      creationDate: this.getCreationDate(),
      params: this.params,
      units: this.units.map(unit => unit.getCreationDate())
    };

    return unit;
  }

  setParam(index: string, value: string): void {
    this.params[index] = value;
  }
  
  getParam(index: string): string {
    return this.params[index];
  }

}