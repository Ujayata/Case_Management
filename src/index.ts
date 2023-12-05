import {
    query,
    update,
    StableBTreeMap,
    Vec,
    Void,
    ic,
    Opt,
    None,
    text,
    Canister,
    
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
    ClientId,
    LawyerId,
    CaseId,
    WitnessId,
    WitnessPayload,

  } from "./types";
  
  let Clients = StableBTreeMap<ClientId, Client>(text, Client, 0);
  let Lawyers = StableBTreeMap<LawyerId, Lawyer>(text, Lawyer, 0);
  let Cases = StableBTreeMap<CaseId, Case>(text, Case, 0);
  let Witnesses = StableBTreeMap<WitnessId, Witness>(text, Witness, 0);
  let ClientCase = StableBTreeMap<ClientId, Vec<ClientId>>(text, Vec(text), 0);



  export default Canister({

    addClient: update([ClientPayload],Client, (payload) => {
      let client : Client = {
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

    addLawyer: update([LawyerPayload], Lawyer,(payload) =>{
      let lawyer: Lawyer = {
        id: uuidv4(),
        Title: payload.Title,
        Name: payload.Name,
        Surname: payload.Surname,
        Phonenumber: payload.Phonenumber,
        Email: payload.Email,
        Case_Category: payload.Case_Category,
        Case_Won: payload.Case_Won,
        Case_Lost: payload.Case_Lost,
        Experience: payload.Experience,
        Nationality: payload.Nationality,
        createdAt: ic.time(), 
      };
      Lawyers.insert(lawyer.id, lawyer);
      return lawyer;

    }),

    addCase: update([CasePayload], Case, (payload) =>{
      let caseData: Case = {
      id: uuidv4(),
      Case_name: payload.Case_name,
      CreatedAt: ic.time(),
      UpdatedAt: None,
      Description: payload.Description,
      Documents: payload.Documents,
      Timeline: payload.Timeline,
      };
      Cases.insert(caseData.id, caseData);
      return caseData;

    }),
    
    addWitness: update([WitnessPayload], Witness,(payload) =>{
      let witness: Witness ={
        id: uuidv4(), 
        Fullname: payload.Fullname,
        national_id: payload.national_id,
        Testimony: payload.Testimony,
      };

      Witnesses.insert(witness.id, witness)
      return witness;
    }),

    //get client by id
    getClient: query([text], Opt(Clients), (id) =>{
      return Clients.get(id);
    }),

    //get all clients
    getAllClients: query([], Vec(Clients), () =>{
      return Clients.values();
    }),

    //get case by id
    getCase: query([text], Opt(Cases), (id) =>{
      return Cases.get(id);
    }),

    //get all cases 
    getCases: query([], Vec(Cases), () =>{
      return Cases.values();
    }),

    //delete Case
    deleteCase: update([text], Void, (CaseId) => {
        // delete case from cases
        Cases.delete(CaseId);
        // delete case from ClientCase
        ClientCase.values().forEach((CaseIds: Vec<CaseId>) => {
          let index = CaseIds.indexOf(CaseId);
          if (index !== -1) {
            CaseIds.splice(index, 1);
          }
        });
        return;
       }),

  })