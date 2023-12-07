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

let Clients = StableBTreeMap<ClientId, Client>(text, Client, 7);
let Lawyers = StableBTreeMap<LawyerId, Lawyer>(text, Lawyer, 8);
let Cases = StableBTreeMap<CaseId, Case>(text, Case, 9);
let Witnesses = StableBTreeMap<WitnessId, Witness>(text, Witness, 10);
let ClientCase = StableBTreeMap<ClientId, Vec<CaseId>>(text, Vec(text), 11);

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
      LawyerId: '',
      ClientId: '',
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

  assignLawyerToCase: update([CaseId, LawyerId], Case, (caseId, lawyerId) => {
    const caseDataOpt = Cases.get(caseId);
    const lawyerOpt = Lawyers.get(lawyerId);

    if('None' in caseDataOpt || 'None' in lawyerOpt) {
      throw new Error('Failed to assign case to the lawyer');
    }
    const caseData: Case = caseDataOpt.Some;
    const lawyer: Lawyer = lawyerOpt.Some;

    const caseUpdated: Case = {
      ...caseData,
      LawyerId: lawyer.id
    }
    Cases.insert(caseData.id, caseUpdated)
    return caseData;
    
  }),

  updateCaseState: update([CaseId, text], Case , (caseId, newState) => {
    const caseDataOpt = Cases.get(caseId);
    if ('None' in caseDataOpt) {
      throw new Error('Case does not exist');
    }
    const caseData: Case = caseDataOpt.Some;
    const newCase: Case = {
      ...caseData, 
      State: newState,

    }
    Cases.insert(caseData.id, newCase);

    return newCase;
  }),

  deleteCase: update([CaseId], Opt(Case), (caseId) => {
    return Cases.remove(caseId);
  }),
});
