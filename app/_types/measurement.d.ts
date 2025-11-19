export type Measurement = {
  _id?: string;
  user?: string;
  name: string;
  details: {
    unit: string;
    body: {
      bodyShape: string;
      postureNotes: string;
      [key: string]: number | string;
    };
    top: {
      [key: string]: number;
    };
    trouser: {
      [key: string]: number;
    };
    preferences: {
      fit: string;
      sleeveStyle: string;
      allowance: number;
    };
  };
  isDefault?: boolean;
};

export type MeasurementState = {
  addMeasurement: (data: Measurement) => Promise<void>;
  updateMeasurement: (data: Measurement, id: string) => Promise<void>;
  deleteMeasurement: (id: string) => Promise<void>;
};
