import {
    Alert,
    AlertDescription,
    AlertIcon,
    Box,
    Button,
    Card,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import React from "react";
import { users } from "../../types";
import { api } from "../../libs/api";
import { Link } from "react-router-dom";

export default function User() {
    const [user, setUser] = React.useState<users>({
        id: "",
        nama: "",
        email: "",
        telepon: "",
        alamat: "",
    });
    const [users, setUsers] = React.useState<users[]>([]);
    const [method, setMethod] = React.useState("");
    const [message, setMessage] = React.useState("");

    async function getUsers() {
        const response = await api.get("/user");
        setUsers(response.data.data);
    }

    React.useEffect(() => {
        getUsers();
    }, []);

    async function handleUser(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        try {
            switch (method) {
                case "post":
                    const response = await api.post("/user", user);
                    setMessage(response.data.message);
                    getUsers();
                    break;
                case "put":
                    const responsePut = await api.put(`/user/${user.id}`, {
                        nama: user.nama,
                        email: user.email,
                        telepon: user.telepon,
                        alamat: user.alamat,
                    });
                    setMessage(responsePut.data.message);
                    getUsers();
                    break;
                default:
                    const responseDelete = await api.delete(`/user/${user.id}`);
                    setMessage(responseDelete.data.message);
                    getUsers();
                    break;
            }
        } catch (error: any) {
            setMessage(error.response.data.errors);
        }
    }

    return (
        <Box m={50} justifyContent={"center"}>
            <Card p={50} w={"full"} bg={"white"} boxShadow={"lg"}>
                <Flex justifyContent="space-between">
                    <Heading fontSize={"25px"} fontWeight={"semibold"}>
                        Manage User
                    </Heading>
                    <Button>
                        <Link to={"/"}>Home</Link>
                    </Button>
                </Flex>
                {message && (
                    <Alert>
                        <AlertIcon />
                        <AlertDescription>{message}</AlertDescription>
                    </Alert>
                )}
                <form>
                    <FormControl mb={5}>
                        <FormLabel>ID</FormLabel>
                        <Input
                            type="text"
                            placeholder="id"
                            onChange={(e) => setUser({ ...user, id: e.target.value })}
                        />
                    </FormControl>
                    <FormControl mb={5}>
                        <FormLabel>Nama</FormLabel>
                        <Input
                            type="text"
                            placeholder="nama"
                            onChange={(e) => setUser({ ...user, nama: e.target.value })}
                        />
                    </FormControl>
                    <FormControl mb={5}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="text"
                            placeholder="email"
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </FormControl>
                    <FormControl mb={5}>
                        <FormLabel>Telepon</FormLabel>
                        <Input
                            type="text"
                            placeholder="telepon"
                            onChange={(e) => setUser({ ...user, telepon: e.target.value })}
                        />
                    </FormControl>
                    <FormControl mb={5}>
                        <FormLabel>Alamat</FormLabel>
                        <Input
                            type="text"
                            placeholder="alamat"
                            onChange={(e) => setUser({ ...user, alamat: e.target.value })}
                        />
                    </FormControl>
                    <FormControl my={5}>
                        <FormLabel>Select Method</FormLabel>
                        <Select onChange={(e) => setMethod(e.target.value)}>
                            <option value="post">post</option>
                            <option value="put">put</option>
                            <option value="delete">delete</option>
                        </Select>
                    </FormControl>
                    <Box mb={5}>
                        <Button onClick={(e) => handleUser(e)}>Submit</Button>
                    </Box>
                </form>

                {users && (
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
                                {users.map((val, idx) => (
                                    <Tr key={idx}>
                                        <Td>{val.id}</Td>
                                        <Td>{val.nama}</Td>
                                        <Td>{val.email}</Td>
                                        <Td>{val.telepon}</Td>
                                        <Td>{val.alamat}</Td>
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
