interface JustShowItUnitInterface {
  id: string;
  type: string;
  params: Array<JustShowItUnitParameters>;
  units: Array<JustShowItUnit>;
  setId(id: String): String;
  getUnitAsJson(): JSON;
}

interface JustShowItUnitParameters {
  index: string;
  value: string;
}

export default class JustShowItUnit implements JustShowItUnitInterface {

  private json: JSON;

  private availableComponentTypes: Array<String> = ["list", "text", "video", "link", "image", "article" ];
  private availableParams: Array<String> = ["text", "title", "description", "url", "resolution", "runtime", "size", "author"];

  private id: string;
  private type: string;
  private params: Array<JustShowItUnitParameters>;
  private units: Array<JustShowItUnit>;
  
  constructor(json: JSON) {
    this.json = json;
    
  }

  getUnitAsJson(): JSON {
    return this.json;
  }

}