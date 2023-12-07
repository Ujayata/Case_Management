import {
  text,
  nat64,
  Vec,
  Opt,
  Record
} from "azle";

export const ClientId = text;
export const LawyerId = text;
export const CaseId = text;
export const WitnessId = text;

export const Client = Record({
  id: ClientId,
  Name: text,
  Surname: text,
  Phonenumber: text,
  Email: text,
  Gender: text,
  Date_Of_Birth: nat64,
  Occupation: text,
  Marital_Status: text,
  Nationality: text,
  datJoined: nat64,
});
export type Client = typeof Client;

export const ClientPayload = Record({
  Name: text,
  Surname: text,
  Phonenumber: text,
  Email: text,
  Gender: text,
  Occupation: text,
  Marital_Status: text,
  Nationality: text,
});
export type ClientPayload = typeof ClientPayload;

export const Lawyer = Record({
  id: LawyerId,
  Title: text,
  Name: text,
  Surname: text,
  Phonenumber: text,
  Email: text,
  Case_Category: text,
  Case_Won: nat64,
  Case_Lost: nat64,
  Experience: text,
  Nationality: text,
  createdAt: nat64,
});
export type Lawyer = typeof Lawyer;

export const LawyerPayload = Record({
  Title: text,
  Name: text,
  Surname: text,
  Phonenumber: text,
  Email: text,
  Case_Category: text,
  Experience: text,
  Nationality: text,
});
export type LawyerPayload = typeof LawyerPayload;

export const Case = Record({
  id: CaseId,
  Case_name: text,
  CreatedAt: nat64,
  UpdatedAt: Opt(nat64),
  Description: text,
  Documents: Vec(text),
  Timeline: text,
  State: text,
  LawyerId: text,
  ClientId: text,
  WitnessIds: Opt(Vec(WitnessId)),
});
export type Case = typeof Case;

export const CasePayload = Record({
  Case_name: text,
  Description: text,
  Documents: Vec(text),
  Timeline: text,
});
export type CasePayload = typeof CasePayload;

export const Witness = Record({
  id: WitnessId,
  Fullname: text,
  national_id: text,
  Testimony: text,
});
export type Witness = typeof Witness;

export const WitnessPayload = Record({
  Fullname: text,
  national_id: text,
  Testimony: text,
});
export type WitnessPayload = typeof WitnessPayload;
