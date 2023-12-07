# Legal Case Management

This project is a Legal Case Management System designed for law firms to effectively track and manage legal cases. It provides a comprehensive platform for clients to register and present their cases, and for the system to assign cases to lawyers based on their specializations.

Key Features:

    Client Registration: Clients can register themselves and provide detailed descriptions of their cases.
    Case Assignment: The system assigns cases to lawyers based on the category of each case.
    Case Tracking: The system tracks the status of each case, whether it's pending, lost, or won.
    Lawyer Performance Monitoring: The system keeps track of each lawyer's performance by recording the number of cases they've won or lost.

With this system, law firms can efficiently manage their legal cases and monitor the performance of their lawyers. 

Welcome to your first Azle project! This example project will help you to deploy your first canister (application) to the Internet Computer (IC) decentralized cloud. It is a simple getter/setter canister. You can always refer to [The Azle Book](https://demergent-labs.github.io/azle/) for more in-depth documentation.

`dfx` is the tool you will use to interact with the IC locally and on mainnet. If you don't already have it installed:

```bash
npm run dfx_install
```

Next you will want to start a replica, which is a local instance of the IC that you can deploy your canisters to:

```bash
npm run replica_start
```

If you ever want to stop the replica:

```bash
npm run replica_stop
```

Now you can deploy your canister locally:

```bash
npm install
npm run canister_deploy_local
```

To call the methods on your canister:

```bash
npm run canister_call_get_message
npm run canister_call_set_message
```

If you run the above commands and then call `npm run canister_call_get_message` you should see:

```bash
("Hello world!")
```

Assuming you have [created a cycles wallet](https://internetcomputer.org/docs/current/developer-docs/quickstart/network-quickstart) and funded it with cycles, you can deploy to mainnet like this:

```bash
npm run canister_deploy_mainnet
```
# Case_Management
