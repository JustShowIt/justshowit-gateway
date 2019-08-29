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
    this.dispatch();
  }
  
  dispatch() {
    if (this.isArray(this.json)) {
      this.generateChildUnits(this.json);
    } else if (this.isObject(this.json)) {
      this.analyzeObject(this.json);
    }
  }

  isStringOrNumber(value: string|Number) {
    return (typeof value === 'string' || typeof value === 'number');
  }
  
  isArray(json: any): boolean {
    return (Array.isArray(json) && json.length > 0);
  }

  isObject(json: any): boolean {
    return (typeof json === 'object' && Object.keys(json).length > 0);
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

  getUuid(): string {
    return this.uuid;
  }

  setType(type: string): void {
    if (type) {
      this.type = type;
    }
    if (this.type !== '' && this.isTypeExists()) {
      this.type = this.json['type'];
    }
  }

  getType(): string {
    return this.type;
  }

  isTypeExists(): boolean {
    return (this.json.hasOwnProperty('type') && this.availableComponentTypes.indexOf(this.json['type']) > -1);
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
    if (!this.params[index] && this.availableParams.indexOf(index) != -1) {
      this.params[index] = value;
    }
  }

  setParams(params: Object): void {
    this.params = params;
  }

  getParam(index: string): string {
    return this.params[index];
  }

  isParamExists(param: string): boolean {
    return (this.params[param]);
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

  analyzeBestComponentType(): string {
    let bestComponentType = analyze.getBestComponentTypeByParams(this.getParams());
    if (this.availableComponentTypes.indexOf(bestComponentType) > -1) {
      this.setType(bestComponentType);
    }
    return bestComponentType;
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

  analyzeObject(json: JSON): void {
    this.setUuid();

    if (this.json['type']) {
      this.setType(this.json['type']);
    }

    Object.keys(this.json).forEach(index => {
      if (index === 'units') {
        this.generateObjectUnit(this.json['units']);
      } else if (index !== 'id' && index !== 'type' && index !== 'currentDate') {
        console.log(index, this.json[index])
        this.analyzeBestPropertyTypeByValue(this.json[index]);
      }
    })

    // Solange keine Params existieren, kann auch keine passende Komponente gefunden werden
    // Params immer als LISTE setzen ...
    let bestComponentType = this.analyzeBestComponentType();
    this.setType(bestComponentType);
    // console.log(this.getParams());


    // Wenn property ein string...
    // this.setParam(analyze.getBestInputTypeByValue(this.json), this.json);
    // this.analyzeBestComponentType();


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

  analyzeBestPropertyTypeByValue(value: string) {
    if (typeof value === 'string' || typeof value === 'number') {
      let bestType = analyze.getBestInputTypeByValue(value);
      this.setType(bestType);
    }
  }

}