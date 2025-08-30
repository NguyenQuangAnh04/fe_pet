export interface AppointmentDTO {
  id?: number;
  ownerName: string;
  phoneNumber: string;
  email: string;
  petName: string;
  petType: string;
  age: number;
  petGender: string;
  appointStatus: string;
  note?: string;
  appointmentDay: string;
  appointmentTime: string;
  totalPrice: number;
  createdAt?: string;
  updatedAt?: string;
  veterinarian?: VeterinarianDTO;
  user?: UserDTO;
  sessionId?: string;
  examination?: ExaminationDTO[];
}

export enum PetGender {
  MALE,
  FEMALE
}

export enum PetType {
  CAT,
  DOG,
  OTHER
}
