import uuidv1 from 'uuid/v1';

interface JustShowItUnitInterface {
  setId(): void;
  getId(): String;
  setType(): void;
  getType(): String;
  setCreationDate(): void;
  getCreationDate(): Date;
  getUnitAsJson(): JSON;
}

// interface JustShowItUnitParameters {
//   index: string;
//   value: string;
// }

export default class JustShowItUnit implements JustShowItUnitInterface {

  private json: JSON;

  // private availableComponentTypes: Array<String> = ["list", "text", "video", "link", "image", "article" ];
  // private availableParams: Array<String> = ["text", "title", "description", "url", "resolution", "runtime", "size", "author"];

  private id: string = uuidv1();
  private type: string = 'debug';
  private creationDate: Date = new Date();
  // private params: Array<JustShowItUnitParameters> = [];
  // private units: Array<JustShowItUnit> = [];
  
  constructor(json: JSON) {
    this.json = json;
    
    this.setId();
    this.setType();
    this.setCreationDate();
  }

  setId(): void {
    if (this.json.hasOwnProperty('id')) {
      this.id = this.json['id'];
    }
  }
  
  getId(): String {
    return this.id;
  }

  setType(): void {
    if (this.json.hasOwnProperty('type')) {
      this.id = this.json['type'];
    }
  }
  
  getType(): String {
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
      id: this.getId(),
      type: this.getType(),
      creationDate: this.getCreationDate().toString()
    };
    return unit;
  }

}