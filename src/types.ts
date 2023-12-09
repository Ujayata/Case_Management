import {
  text,
  nat64,
  Vec,
  Opt,
  Record,
  Date,
  DateTime,
} from "azle";

type Document = {
  name: text;
  size: nat64;
  mimeType: text;
  data: string; // Replace with appropriate data type based on your needs
};

export const ClientId = text;
export const LawyerId = text;
export const CaseId = text;
export const WitnessId = text;

export const Client = Record({
  id: ClientId,
  name: text,
  surname: text,
  phoneNumber: text,
  email: text,
  gender: text,
  dateOfBirth: Date,
  occupation: text,
  maritalStatus: text,
  nationality: text,
  dateJoined: nat64,
});
export type Client = typeof Client;

export const ClientPayload = Record({
  name: text,
  surname: text,
  phoneNumber: text,
  email: text,
  gender: text,
  occupation: text,
  maritalStatus: text,
  nationality: text,
});
export type ClientPayload = typeof ClientPayload;

export const Lawyer = Record({
  id: LawyerId,
  title: text,
  name: text,
  surname: text,
  phoneNumber: text,
  email: text,
  caseCategory: text,
  casesWon: nat64,
  casesLost: nat64,
  experience: text,
  nationality: text,
  createdAt: DateTime,
});
export type Lawyer = typeof Lawyer;

export const LawyerPayload = Record({
  title: text,
  name: text,
  surname: text,
  phoneNumber: text,
  email: text,
  caseCategory: text,
  experience: text,
  nationality: text,
});
export type LawyerPayload = typeof LawyerPayload;

export const Case = Record({
  id: CaseId,
  name: text,
  createdAt: DateTime,
  updatedAt: Opt(DateTime),
  description: text,
  documents: Vec<Document>,
  timeline: text,
  state: text,
  lawyerId: LawyerId,
  clientId: ClientId,
  witnesses: Vec<Witness>, // Replaced WitnessIds with an array of Witness objects
});
export type Case = typeof Case;

export const CasePayload = Record({
  name: text,
  description: text,
  documents: Vec<Document>, // Replaced Vec(text) with Vec<Document> for better data integrity
  timeline: text,
});
export type CasePayload = typeof CasePayload;

export const Witness = Record({
  id: WitnessId,
  fullName: text,
  nationalId: text,
  testimony: text,
});
export type Witness = typeof Witness;

export const WitnessPayload = Record({
  fullName: text,
  nationalId: text,
  testimony: text,
});
export type WitnessPayload = typeof WitnessPayload;
