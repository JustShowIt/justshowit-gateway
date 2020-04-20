interface JustShowItUnitInterface {
  dispatch(): void;
  setUuid(uuid?: string): void;
  getUuid(): string;
  setType(type?: string): void;
  getType(): string;
  setCreationDate(): void;
  getCreationDate(): Date;
  setParam(index: string, value: string): void;
  setParams(params: Object): void;
  getParam(index: string): Array<string>;
  getParams(): Object;
  isStringOrNumber(value: string|Number): Boolean;
  isArray(json: any): Boolean;
  isObject(json: any): Boolean;
  addUnit(unit: JustShowItUnitInterface): void;
  getUnitAsJSON(): JSON;
  getBestComponentType(): string;
  generateChildUnits(json: JSON): void;
  assembleUnitParams(json: JSON): void;
}
