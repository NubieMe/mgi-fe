import {
    Alert,
    AlertDescription,
    AlertIcon,
    Box,
    Button,
    Card,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import React from "react";
import { api } from "../../libs/api";
import { file, users } from "../../types";
import { Link } from "react-router-dom";

export default function Home() {
    const [file, setFile] = React.useState<file>({
        file: null,
    });
    const [message, setMessage] = React.useState("");
    const [data, setData] = React.useState<users[]>();
    const [selectedRows, setSelectedRows] = React.useState<number[]>([]);

    async function upload(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        try {
            e.preventDefault();
            const response = (
                await api.post("/upload", file, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
            ).data;

            setData(response.data);
        } catch (error: any) {
            setMessage(error.response.data.errors);
        }
    }

    function handleCheckboxChange(index: number) {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(index)) {
                return prevSelectedRows.filter((i) => i !== index);
            } else {
                return [...prevSelectedRows, index];
            }
        });
    }

    async function handleImport() {
        const selectedData = selectedRows.map((index) => data![index]);
        try {
            const response = await api.post("/import", {
                data: selectedData,
            });
            setMessage(response.data.message);
        } catch (error: any) {
            setMessage(error.response.data.errors);
        }
    }

    return (
        <Box m={50} justifyContent="center">
            <Card p={50} w={"full"} bg={"white"} boxShadow={"lg"}>
                <Flex justifyContent="space-between" alignItems={"center"}>
                    <Heading fontSize={"25px"} fontWeight={"semibold"}>
                        Upload File CSV
                    </Heading>
                    <Button>
                        <Link to={"/user"}>Manage User</Link>
                    </Button>
                </Flex>
                <form>
                    {message && (
                        <Alert>
                            <AlertIcon />
                            <AlertDescription>{message}</AlertDescription>
                        </Alert>
                    )}
                    <FormControl my={5}>
                        <FormLabel>select a file with csv format</FormLabel>
                        <input type="file" accept=".csv" onChange={(e) => setFile({ file: e.target.files![0] })} />
                    </FormControl>
                    <Box display={"Flex"} justifyContent={"space-between"}>
                        <Button type="submit" onClick={(e) => upload(e)}>
                            Upload
                        </Button>
                        {data && <Button onClick={handleImport}>import</Button>}
                    </Box>
                </form>

                {data && (
                    <>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Id</Th>
                                    <Th>Nama</Th>
                                    <Th>Email</Th>
                                    <Th>Telepon</Th>
                                    <Th>Alamat</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.map((val, idx) => (
                                    <Tr key={idx}>
                                        <Td>{val.id}</Td>
                                        <Td>{val.nama}</Td>
                                        <Td>{val.email}</Td>
                                        <Td>{val.telepon}</Td>
                                        <Td>{val.alamat}</Td>
                                        <Td>
                                            <Checkbox
                                                onChange={() => handleCheckboxChange(idx)}
                                                checked={selectedRows.includes(idx)}
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </>
                )}
            </Card>
        </Box>
    );
}
