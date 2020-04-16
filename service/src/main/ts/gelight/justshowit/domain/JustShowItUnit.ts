import uuidv1 from 'uuid/v1';
import analyze from './analyze/analyze';

export default class JustShowItUnit implements JustShowItUnitInterface {

  private json: JSON;

  private availableComponentTypes: Array<string> = ["list", "text", "video", "link", "image", "article"];
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
    
    this.dispatch();
  }
  
  dispatch() {
    if (this.isArray(this.json)) {
      this.generateChildUnits(this.json);
    } else if (this.isObject(this.json)) {
      this.analyzeObject(this.json);
    }
  }
  
  isArray(json: any): boolean {
    return (Array.isArray(json) && json.length > 0);
  }

  generateChildUnits(json: JSON): void {
    this.setType('list');
    if (Object.keys(json).length) {
      for (let index in json) {
        if (Object.keys(json[index]).length) {
          this.addUnit(new JustShowItUnit(json[index]));
        }
      }
    }
  }

  isObject(json: any): boolean {
    return (typeof json === 'object' && Object.keys(json).length > 0);
  }

  analyzeObject(json: JSON): void {
    this.setUuid();

    Object.keys(this.json).forEach(index => {
      if (index === 'units') {
        this.generateObjectUnit(this.json['units']);
      } else if (index !== 'id' && index !== 'type' && index !== 'currentDate') {
        this.getBestPropertyType(this.json[index]);
      }
    })

    // Solange keine Params existieren, kann auch keine passende Komponente gefunden werden
    // Params immer als LISTE setzen ...
    let bestComponentType = this.getBestComponentType();
    this.setType(bestComponentType);
    // console.log(this.getParams());


    // Wenn property ein string...
    // this.setParam(analyze.getBestInputTypeByValue(this.json), this.json);
    // this.getBestComponentType();

  }

  setUuid(uuid?: string): void {
    if (uuid) {
      this.uuid = uuid;
    }
    if (this.uuid !== '' && this.json.hasOwnProperty('id')) {
      this.uuid = this.json['id'];
    }
    if (this.uuid !== '' && this.json.hasOwnProperty('uuid')) {
      this.uuid = this.json['uuid'];
    }
  }

  generateObjectUnit(units: JSON) {
    Object.keys(units).forEach(index => {
      let unit = units[index];
      if (typeof unit === 'string' || typeof unit === 'number') {
        let json: any = { text: unit };
        this.addUnit(new JustShowItUnit(json));
      } else {
        this.addUnit(new JustShowItUnit(unit));
      }
    });
  }

  getBestPropertyType(value: string) {
    if (typeof value === 'string' || typeof value === 'number') {
      let bestType = analyze.getBestInputTypeByValue(value);
      console.log("Param >>>", bestType, ">>>", value);
      this.setParam(bestType, value);
    }
  }

  getBestComponentType(): string {
    let bestComponentType = analyze.getBestComponentTypeByParams(this.getParams());
    if (this.availableComponentTypes.indexOf(bestComponentType) > -1) {
      this.setType(bestComponentType);
    }
    return bestComponentType;
  }

  setType(type: string): void {
    if (type) {
      this.type = type;
    }
    if (this.type !== '' && this.isTypeExists()) {
      this.type = this.json['type'];
    }
  }

  isTypeExists(): boolean {
    return (this.json.hasOwnProperty('type') && this.availableComponentTypes.indexOf(this.json['type']) > -1);
  }

  isStringOrNumber(value: string|Number) {
    return (typeof value === 'string' || typeof value === 'number');
  }

  setCreationDate(): void {
    if (this.json.hasOwnProperty('creationDate')) {
      this.creationDate = this.json['creationDate'];
    }
  }

  setParam(index: string, value: string): void {
    if (this.availableParams.indexOf(index) != -1) {
      if (!this.params[index]) {
        this.params[index] = [];
      }
      this.params[index].push(value);
    }
  }

  setParams(params: Object): void {
    this.params = params;
  }

  getParam(index: string): Array<string> {
    return this.params[index];
  }

  isParamExists(param: string): boolean {
    return (this.params[param]);
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

  getUuid(): string {
    return this.uuid;
  }

  getType(): string {
    return this.type;
  }

  getCreationDate(): Date {
    return this.creationDate;
  }

  getParams(): Object {
    return this.params;
  }

}