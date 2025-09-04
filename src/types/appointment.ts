import type { ExaminationDTO } from "./examination";
import type { VeterinarianDTO } from "./veterinarian";

export interface AppointmentDTO {
    id: number;
    ownerName: string;
    phoneNumber: string;
    email: string;
    petName: string;
    petType: string;
    age: number;
    petGender: string;
    note?: string;
    appointmentDay: string;
    appointmentTime: string;
    totalPrice: number;
    createdAt?: string;
    updatedAt?: string;
    veterinarian?: VeterinarianDTO;
    // user?: UserDTO;
    // sessionId?: string;
    examination?: ExaminationDTO[];
    appointStatus?: AppointStatus;
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

export enum AppointStatus {
    ALL = "",
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
}


