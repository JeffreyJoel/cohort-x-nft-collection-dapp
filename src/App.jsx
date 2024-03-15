import {
  Box,
  Button,
  Container,
  Dialog,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";
import { configureWeb3Modal } from "./connection";
import "@radix-ui/themes/styles.css";
import Header from "./component/Header";
import AppTabs from "./component/AppTabs";
import useCollections from "./hooks/useCollections";
import useMyNfts from "./hooks/useMyNfts";
import useHandleTransfer from "./hooks/useHandleTrasfer";
import { useState } from "react";

configureWeb3Modal();

function App() {
  const tokensData = useCollections();
  const myTokenIds = useMyNfts();
  const handleTransfer = useHandleTransfer();

//   const [address, setAddress] = useState("");
  const [addressTo, setAddressTo] = useState("");

  const myTokensData = tokensData.filter((x, index) =>
    myTokenIds.includes(index)
  );
  console.log(myTokensData);
  return (
    <Container>
      <Header />
      <main className="mt-6">
        <AppTabs
          MyNfts={
            <Flex align="center" gap="8" wrap={"wrap"}>
              {myTokensData.length === 0 ? (
                <Text>No NFT owned yet</Text>
              ) : (
                myTokensData.map((x, index) => (
                  <Box key={x.dna} className="w-[20rem]">
                    <img
                      src={x.image}
                      className="w-full object-contain"
                      alt={x.name}
                    />
                    <Text className="block text-2xl">Name: {x.name}</Text>
                    <Text className="block">Description: {x.description}</Text>
                    <Button
                      className="px-8 py-2 text-xl mt-2"
                      variant="outline"
                    >
                      <a
                        href={`https://testnets.opensea.io/assets/mumbai/${
                          import.meta.env.VITE_contract_address
                        }/${x.edition}`}
                      >
                        Link to Opensea
                      </a>
                    </Button>

                    {/* <Button
                      className="px-8 py-2 text-xl mt-2"
                      onClick={() => handleTransfer(x)}
                    >
                      Transfer
                    </Button> */}
                    <Dialog.Root>
                      <Dialog.Trigger>
                        <Button className="px-8 py-2 text-xl mt-2">Transfer</Button>
                      </Dialog.Trigger>

                      <Dialog.Content style={{ maxWidth: 450 }}>
                        <Dialog.Title>Transfer </Dialog.Title>
                        <Dialog.Description size="2" mb="4">
                          Input address
                        </Dialog.Description>

                        <Flex direction="column" gap="3">
                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              Address
                            </Text>
                            <TextField.Input
                              value={addressTo}
                              onChange={(e) => setAddressTo(e.target.value)}
                              placeholder="Enter valid address"
                            />
                          </label>
                        </Flex>

                        <Flex gap="3" mt="4" justify="end">
                          <Dialog.Close>
                            <Button variant="soft" color="gray">
                              Cancel
                            </Button>
                          </Dialog.Close>
                          <Dialog.Close>
                            <Button
                              className="button"
                              onClick={() => {
                                handleTransfer(addressTo, index);
                              }}
                            >
                              Transfer
                            </Button>
                          </Dialog.Close>
                        </Flex>
                      </Dialog.Content>
                    </Dialog.Root>
                  </Box>
                ))
              )}
            </Flex>
          }
          AllCollections={
            <Flex align="center" gap="8" wrap={"wrap"}>
              {tokensData.length === 0 ? (
                <Text>Loading...</Text>
              ) : (
                tokensData.map((x) => (
                  <Box key={x.dna} className="w-[20rem]">
                    <img
                      src={x.image}
                      className="w-full object-contain"
                      alt={x.name}
                    />
                    <Text className="block text-2xl">Name: {x.name}</Text>
                    <Text className="block">Description: {x.description}</Text>
                    <Button className="px-8 py-2 text-xl mt-2">Mint</Button>
                  </Box>
                ))
              )}
            </Flex>
          }
        />
      </main>
    </Container>
  );
}

export default App;
