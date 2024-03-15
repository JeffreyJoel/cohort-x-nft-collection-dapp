import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getContract } from "../constants/contracts";

const useHandleTransfer = () => {
  const { chainId, address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(
    async (addressTo, tokenId) => {
      if (!isSupportedChain(chainId)) return console.error("Wrong network");
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const contract = getContract(signer);

      try {
        const transaction = await contract.transferFrom(
          address,
          addressTo,
          tokenId
        );
        console.log("transaction: ", transaction);
        const receipt = await transaction.wait();

        console.log("receipt: ", receipt);

      
      } catch (error) {
        console.log(error);
        console.log("Failed to Transfer");
      }
    },
    [chainId, walletProvider, address]
  );
};

export default useHandleTransfer;
