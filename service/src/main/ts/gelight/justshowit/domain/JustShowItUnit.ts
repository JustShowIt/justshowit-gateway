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

  private availableComponentTypes: Array<string> = ["list", "text", "video", "link", "image", "article" ];
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
      params: this.getParams(),
      units: this.units.map(unit => unit.getUnitAsJSON())
    };

    return unit;
  }

  analyzeStringValue(value: string): string {
    
    // Analyzed value to choose the best input type
    let bestInputType = analyze.getBestInputTypeByValue(value);
    if (this.availableParams.indexOf(bestInputType) > -1) {
      this.setParam(bestInputType, value);
    }
    
    console.log(bestInputType, value);

    // Analyzed which is the best component based on defined params 
    let bestComponentType = analyze.getBestComponentTypeByParams(this.getParams());
    if (this.availableComponentTypes.indexOf(bestComponentType) > -1) {
      this.setType(bestComponentType);
    }

    return bestInputType;
  }

  analyzeArrayValue(json: JSON): void {
    this.setType('list');
    for (let index in json) {
      this.addUnit(new JustShowItUnit(json[index]));
    }
  }

  analyzeObjectValue(json: JSON): void {
    
    // Not implemented yet ...

    // Wenn "uuid" oder "id" Feld vorhanden, dann automatisch setzen. 
    // Eventuell setUuid() erweitern ...

    //  ... danach ...

    // Allgemein alle Eigenschaften durchlaufen (for Schleife) und: 
    //  ... 1. getBestInputTypeByValue()
    //      - aber nur in "params" speichern, wenn der parameter in params noch nicht existiert
    
    // Wenn "params" Object vorhanden, dann für alle params (for Schleife), die nicht in "availableComponentTypes" existieren: 
    //  ... 1. getBestInputTypeByValue()
    //      - aber nur in "params" speichern, wenn der parameter in params noch nicht existiert
    
    //  ... danach ...
    
    // Wenn "type" Feld vorhanden UND der angegebene "type" auch in "availableComponentTypes" vorhanden, dann automatisch setzen
    //  ... andernfalls type analysieren und automatisch setzen lassen.
    //      - getBestComponentTypeByParams()
    
  }

}