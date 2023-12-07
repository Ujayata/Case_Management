import {
  query,
  update,
  StableBTreeMap,
  Vec,
  Opt,
  None,
  text,
  Void,
  Canister,
  ic,
} from "azle";
import { v4 as uuidv4 } from "uuid";
import {
  Client,
  ClientPayload,
  Lawyer,
  LawyerPayload,
  Case,
  CasePayload,
  Witness,
  WitnessPayload,
  ClientId,
  LawyerId,
  CaseId,
  WitnessId,
} from "./types";

let Clients = StableBTreeMap<ClientId, Client>(text, Client, 6);
let Lawyers = StableBTreeMap<LawyerId, Lawyer>(text, Lawyer, 2);
let Cases = StableBTreeMap<CaseId, Case>(text, Case, 3);
let Witnesses = StableBTreeMap<WitnessId, Witness>(text, Witness, 4);
let ClientCase = StableBTreeMap<ClientId, Vec<CaseId>>(text, Vec(text), 5);

export default Canister({
  addClient: update([ClientPayload], Client, (payload) => {
    let client: Client = {
      id: uuidv4(),
      Name: payload.Name,
      Surname: payload.Surname,
      Phonenumber: payload.Phonenumber,
      Email: payload.Email,
      Gender: payload.Gender,
      Date_Of_Birth: ic.time(),
      Occupation: payload.Occupation,
      Marital_Status: payload.Marital_Status,
      Nationality: payload.Nationality,
      datJoined: ic.time(),
    };
    Clients.insert(client.id, client);
    return client;
  }),

  addLawyer: update([LawyerPayload], Lawyer, (payload) => {
    let lawyer: Lawyer = {
      id: uuidv4(),
      Title: payload.Title,
      Name: payload.Name,
      Surname: payload.Surname,
      Phonenumber: payload.Phonenumber,
      Email: payload.Email,
      Case_Category: payload.Case_Category,
      Case_Won: 0,
      Case_Lost: 0,
      Experience: payload.Experience,
      Nationality: payload.Nationality,
      createdAt: ic.time(),
    };
    Lawyers.insert(lawyer.id, lawyer);
    return lawyer;
  }),

  addCase: update([CasePayload], Case, (payload) => {
    let caseId = uuidv4();
    let caseData: Case = {
      id: caseId,
      Case_name: payload.Case_name,
      CreatedAt: ic.time(),
      UpdatedAt: None,
      Description: payload.Description,
      Documents: payload.Documents,
      Timeline: payload.Timeline,
      State: "Pending",
      LawyerId: None,
      ClientId: None,
      WitnessIds: None,
    };
    Cases.insert(caseId, caseData);
    return caseData;
   }),   
   

  addWitness: update([WitnessPayload], Witness, (payload) => {
    let witness: Witness = {
      id: uuidv4(),
      Fullname: payload.Fullname,
      national_id: payload.national_id,
      Testimony: payload.Testimony,
    };
    Witnesses.insert(witness.id, witness);
    return witness;
  }),

  getClient: query([ClientId], Opt(Client), (id) => {
    return Clients.get(id);
  }),

  getAllClients: query([], Vec(Client), () => {
    return Clients.values();
  }),

  getCase: query([CaseId], Opt(Case), (id) => {
    return Cases.get(id);
  }),

  getAllCases: query([], Vec(Case), () => {
    return Cases.values();
  }),

  assignLawyerToCase: update([CaseId, LawyerId], Void, (caseId, lawyerId) => {
    let caseData = Cases.get(caseId);
    if (caseData) {
      caseData.LawyerId = lawyerId;
      Cases.insert(caseId, caseData);
    }
    return;
  }),

  updateCaseState: update([CaseId, text], Void, (caseId, newState) => {
    let caseData = Cases.get(caseId);
    if (caseData) {
      caseData.State = newState;
      Cases.insert(caseId, caseData);
    }
    return;
  }),

  deleteCase: update([CaseId], Void, (caseId) => {
    Cases.delete(caseId);
    ClientCase.values().forEach((caseIds: Vec<CaseId>) => {
      let index = caseIds.indexOf(caseId);
      if (index !== -1) {
        caseIds.splice(index, 1);
      }
    });
    return;
  }),
});
