interface JustShowItUnitInterface {
  setUuid(uuid?: string): void;
  getUuid(): string;
  setType(type?: string): void;
  getType(): string;
  setCreationDate(): void;
  getCreationDate(): Date;
  setParam(index: string, value: string): void;
  getParam(index: string): string;
  getParams(): Object;
  addUnit(unit: JustShowItUnit): void;
  getUnitAsJSON(): JSON;
  analyzeStringValue(value: string): void;
  analyzeArrayValue(json: JSON): void;
  analyzeObjectValue(json: JSON): void;
}

import uuidv1 from 'uuid/v1';
import analyze from './analyze/analyze';

export default class JustShowItUnit implements JustShowItUnitInterface {

  private json: JSON;

  // private availableComponentTypes: Array<string> = ["list", "text", "video", "link", "image", "article" ];
  private availableParams: Array<string> = ["text", "title", "description", "url", "resolution", "runtime", "size", "author"];

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
      
      this.analyzeStringValue(this.json);

    } else if (Array.isArray(this.json) && this.json.length) {
      
      this.analyzeArrayValue(this.json);

    } else if (typeof this.json === 'object' && Object.keys(this.json).length) {

      this.analyzeObjectValue(this.json);

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

  getParams(): Object {
    return this.params;
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

  analyzeStringValue(value: string): void {
    // Analyzed value to choose the best input type
    let bestInputType = analyze.getBestInputTypeByValue(value);
    if (this.availableParams.indexOf(bestInputType) > -1) {
      this.setParam(bestInputType, value);
    }
    // Analyzed which is the best component based on defined params 
    let bestComponentType = analyze.getBestComponentTypeByParams(this.getParams());
    this.setType(bestComponentType);
  }

  analyzeArrayValue(json: JSON): void {
    this.setType('list');
    for (let index in json) {
      this.addUnit(new JustShowItUnit(json[index]));
    }
  }

  analyzeObjectValue(json: JSON): void {
    
    // Not implemented yet ...
    
  }

}