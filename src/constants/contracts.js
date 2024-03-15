import { ethers } from "ethers";
import Abi from "./erc721.json";

export const getContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_ballot_contract_address,
        Abi,
        providerOrSigner
    );
