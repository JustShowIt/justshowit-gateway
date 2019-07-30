interface JustShowItUnitInterface {
    setUuid(uuid?: string): void;
    getUuid(): string;
    setType(type?: string): void;
    getType(): string;
    setCreationDate(): void;
    getCreationDate(): Date;
    setParam(index: string, value: string): void;
    setParams(params: Object): void;
    getParam(index: string): string;
    getParams(): Object;
    addUnit(unit: JustShowItUnitInterface): void;
    getUnitAsJSON(): JSON;
    analyzeBestComponentType(): string;
    analyzeArray(json: JSON): void;
    analyzeObject(json: JSON): void;
  }
