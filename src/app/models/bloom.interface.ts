export interface BloomApiResponse {
  code: number;
  data: BloomData;
  success: boolean;
  message: string;
}

export interface BloomData {
  id: number;
  name: string;
  fileName: string;
  students: Student[];
  fields: Field[];
}

export interface Student {
  id: number;
  name: string;
  lastName: string;
  secondLastName: string;
  groupId: number;
  groupName: string;
}

export interface Field {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
}
