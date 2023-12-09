import {
  query,
  update,
  BTreeMap,
  Vec,
  Opt,
  None,
  text,
  Canister,
  ic,
  Principal,
} from "azle";
import { v4 as uuidv4 } from "uuid";
import { Client, ClientPayload, Lawyer, LawyerPayload, Case, CasePayload, Witness, WitnessPayload, ClientId, LawyerId, CaseId, WitnessId } from "./types";

let clients = BTreeMap<ClientId, Client>(text, Client);
let lawyers = BTreeMap<LawyerId, Lawyer>(text, Lawyer);
let cases = BTreeMap<CaseId, Case>(text, Case);
let witnesses = BTreeMap<WitnessId, Witness>(text, Witness);
let clientCases = BTreeMap<ClientId, Vec<CaseId>>(text, Vec(text));

export default Canister({
  addClient: update([ClientPayload], Client, (payload) => {
    const client: Client = {
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
      DateJoined: ic.time(),
    };
    clients.insert(client.id, client);
    return client;
  }),

  addLawyer: update([LawyerPayload], Lawyer, (payload) => {
    const lawyer: Lawyer = {
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
    lawyers.insert(lawyer.id, lawyer);
    return lawyer;
  }),

  addCase: update([CasePayload], Case, (payload) => {
    const caseId = uuidv4();
    const caseData: Case = {
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
    cases.insert(caseId, caseData);
    return caseData;
  }),

  addWitness: update([WitnessPayload], Witness, (payload) => {
    const witness: Witness = {
      id: uuidv4(),
      Fullname: payload.Fullname,
      national_id: payload.national_id,
      Testimony: payload.Testimony,
    };
    witnesses.insert(witness.id, witness);
    return witness;
  }),

  getClient: query([ClientId], Opt(Client), (id) => {
    return clients.get(id);
  }),

  getAllClients: query([], Vec(Client), () => {
    return clients.values();
  }),

  getCase: query([CaseId], Opt(Case), (id) => {
    return cases.get(id);
  }),

  getAllCases: query([], Vec(Case), () => {
    return cases.values();
  }),

  assignLawyerToCase: update([CaseId, LawyerId], Case, (caseId, lawyerId) => {
    const caseDataOpt = cases.get(caseId);
    const lawyerOpt = lawyers.get(lawyerId);

    if (caseDataOpt.isNone() || lawyerOpt.isNone()) {
      throw new Error('Failed to assign case to the lawyer');
    }

    const caseData: Case = caseDataOpt.unwrap();
    const lawyer: Lawyer = lawyerOpt.unwrap();

    // Access control: Check if the caller is authorized to assign the lawyer to the case
    const caller = Principal.fromActor(ic.agent);
    if (caseData.ClientId.isSome() && !clientCases.get(caseData.ClientId.unwrap()).contains(caseId)) {
      throw new Error('Unauthorized: Caller is not the client associated with the case.');
    }

    const caseUpdated: Case = {
      ...caseData,
      LawyerId: Some(lawyer.id),
    };
    cases.insert(caseData.id, caseUpdated);
    return caseData;
  }),

  updateCaseState: update([CaseId, text], Case , (caseId, newState) => {
    const caseDataOpt = cases.get(caseId);
    if (caseDataOpt.isNone()) {
      throw new Error('Case does not exist');
    }

    const caseData: Case = caseDataOpt.unwrap();

    // Access control: Check if the caller is authorized to update the case state
    const caller = Principal.fromActor(ic.agent);
    if (caseData.ClientId.isSome() && !clientCases.get(caseData.ClientId.unwrap()).contains(caseId)) {
      throw new Error('Unauthorized: Caller is not the client associated with the case.');
    }

    const newCase: Case = {
      ...caseData, 
      State: newState,
    };
    cases.insert(caseData.id, newCase);

    return newCase;
  }),

  deleteCase: update([CaseId], Opt(Case), (caseId) => {
    return cases.remove(caseId);
  }),
});
