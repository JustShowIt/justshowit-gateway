interface JustShowItUnitInterface {
  setUuid(uuid?: string): void;
  getUuid(): string;
  setType(type?: string): void;
  getType(): string;
  setCreationDate(): void;
  getCreationDate(): Date;
  setParam(index: string, value: string): void;
  getParam(index: string): string;
  addUnit(unit: JustShowItUnit): void;
  getUnitAsJSON(): JSON;
}

import uuidv1 from 'uuid/v1';
// import analyze from './analyze/analyze';

export default class JustShowItUnit implements JustShowItUnitInterface {

  private json: JSON;

  // private availableComponentTypes: Array<string> = ["list", "text", "video", "link", "image", "article" ];
  // private availableParams: Array<string> = ["text", "title", "description", "url", "resolution", "runtime", "size", "author"];

  private uuid: string = '';
  private type: string = '';
  private creationDate: Date = new Date();
  private params: Object = {};
  private units: JustShowItUnit[] = [];
  
  constructor(json: JSON) {
    this.json = json;
    
    this.setUuid(uuidv1());
    this.setCreationDate();

    if (typeof this.json === 'string') {
      
      // 1. Analyze string and choose the best parameter type
      // 2. Analyze which is the best component based on params 

      this.setType("text");
      this.setParam("text", this.json);

    } else if (Array.isArray(this.json) && this.json.length) {
      
      this.setType('list');
      for (let index in this.json) {
        this.addUnit(new JustShowItUnit(this.json[index]));
      }

    } else if (typeof this.json === 'object' && Object.keys(this.json).length) {

      // 1. Analyze all params and replace or set all related params
      // 2. Analyze which is the best component based on params 

    }
    
  }

  setUuid(uuid: string): void {
    if (uuid) {
      this.uuid = uuid;
    }
    if (this.uuid !== '' && this.json.hasOwnProperty('uuid')) {
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
    if (this.type !== '' && this.json.hasOwnProperty('type')) {
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

  setParam(index: string, value: string): void {
    this.params[index] = value;
  }
  
  getParam(index: string): string {
    return this.params[index];
  }

  addUnit(unit: JustShowItUnit): void {
    this.units.push(unit);
  }
  
  getUnitAsJSON(): JSON {
    let unit: any = {
      id: this.getUuid(),
      type: this.getType(),
      creationDate: this.getCreationDate(),
      params: this.params,
      units: this.units.map(unit => unit.getUnitAsJSON())
    };

    return unit;
  }

}