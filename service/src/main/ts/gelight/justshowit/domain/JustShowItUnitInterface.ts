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
    analyzeBestInputType(value: string): void;
    analyzeBestComponentType(): string;
    analyzeArrayValue(json: JSON): void;
    analyzeObjectValue(json: JSON): void;
  }
