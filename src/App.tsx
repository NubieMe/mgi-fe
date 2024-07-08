import { ChakraProvider, extendTheme, Heading } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/home";
import User from "./page/user";
const theme = extendTheme({
    styles: {
        global: {
            body: {
                bg: "gray",
                color: "#f2f2f2",
            },
        },
    },
});
function App() {
    return (
        <>
            <ChakraProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path="*" element={<Heading>Not Found</Heading>} />
                        <Route path="/" element={Home()} />
                        <Route path="/user" element={User()} />
                    </Routes>
                </Router>
            </ChakraProvider>
        </>
    );
}

export default App;
