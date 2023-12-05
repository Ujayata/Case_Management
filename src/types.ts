import {
    text,
    Record,
    nat64,
    Opt,
  } from "azle";

    export type ClientId = text;
    export type LawyerId = text;
    export type CaseId = text;
    export type WitnessId = text;

 
  export const Client = Record({
    id: text,
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
    Date_Of_Birth: nat64,
    Occupation: text,
    Marital_Status: text,
    Nationality: text,

    });

    export type ClientPayload = typeof ClientPayload;
    
    export const Lawyer = Record({
    id: text,
    Title: text,
    Name: text,
    Surname: text,
    Phonenumber: text,
    Email: text,
    Case_Category: text,
    Case_Won: text,
    Case_Lost: text,
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
        Case_Won: text,
        Case_Lost: text,
        Experience: text,
        Nationality: text,
    
        });
        
    export type LawyerPayload = typeof LawyerPayload;
    
    export const Case = Record({
    id: text,
    Case_name: text,
    CreatedAt: nat64,
    UpdatedAt: Opt(nat64),
    Description: text,
    Documents: text,
    Timeline: text,
    
    });
    
    export type Case = typeof Case;

    export const CasePayload = Record({
        Case_name: text,
        UpdatedAt: Opt(nat64),
        Description: text,
        Documents: text,
        Timeline: text,

        });
    
    export type CasePayload = typeof CasePayload;

    export const Witness = Record ({
    id: text, 
    Fullname: text,
    national_id: text,
    Testimony: text,
    
    });
    export type Witness = typeof Witness;

    export const WitnessPayload = Record ({
        id: text, 
        Fullname: text,
        national_id: text,
        Testimony: text,
        
        });
    export type WitnessPayload = typeof WitnessPayload;
    
    
    