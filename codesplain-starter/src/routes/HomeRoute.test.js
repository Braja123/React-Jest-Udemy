import {render, screen} from "@testing-library/react";
import {setupServer} from "msw/node";
import {rest} from "msw";
import { MemoryRouter } from "react-router";
import HomeRoute from "./HomeRoute";
import { createServer } from "../test/server";

// GOAL
createServer([
    {
        path: "/api/repositories",
        method: "get",
        res: (req) => {
        const language = req.url.searchParams.get('q').split("language:")[1];

            return {
                items: [
                    {id: 1, full_name: `${language}_one`},
                    {id: 2, full_name: `${language}_two`},
                ]
            }
        }
    }
])

// API call testing
// const handlers = [
//     rest.get("/api/repositories", (req, res, ctx) => {
//         // Here we will check for the query string
//         const language = req.url.searchParams.get('q').split("language:")[1];
//         console.log(language);
        
//         // here we will mock the response that we will get after the api call
//         return res(
//             ctx.json({
//                 items: [
//                     {id: 1, full_name: `${language}_one`},
//                     {id: 2, full_name: `${language}_two`},
//                 ]
//             })
//         )
//     })
// ]

// const server = setupServer(...handlers);

// it will execute before test start
// beforeAll(() => {
//     // it means before we run any of our tests, runs this little bit, start our server up and start listening for incoming requests
//     server.listen();
// })

// // it will execute after each test pass or fail
// afterEach(() => {
//     // this is going to tell the server to reset each of the handlers to their initial default state
//     server.resetHandlers();
// })

// // after all is going to run after all of our different tests inside of the file
// // after we have executed all of our state stop our running server, just shut it down
// afterAll(() => {
//     server.close();
// })

test("renders two links for each language", async() => {
    render(
        // MemoryRouter is required as we are using Link tag and that is coming from react router
        <MemoryRouter>
            <HomeRoute />
        </MemoryRouter>
    )

    // screen.debug();
    
    // Loop over each language
    const languages = [
        'javascript',
        'typescript',
        'rust',
        'go',
        'python',
        'java'
    ]

    // Any time that we get the "act" warning probably means we are fetching some data and we might be updating our state at some unexpected time. We always solve that by making use of findAllByRole() in general whenever we are doing any data fetching at all, espesially with this MSW library you probably want to use findAllBy at some point in time or findBy either are the asynchronus ones.

    for(let language of languages) {
        // For each language, make sure we see two links
        const links = await screen.findAllByRole('link', {
            name: new RegExp(`${language}_`)
        })

        expect(links).toHaveLength(2);
        // Assert that the link has the appropriate full_name 
        expect(links[0]).toHaveTextContent(`${language}_one`);
        expect(links[1]).toHaveTextContent(`${language}_two`);
        expect(links[0]).toHaveAttribute('href', `/repositories/${language}_one`);
        expect(links[1]).toHaveAttribute('href', `/repositories/${language}_two`);
        // screen.debu1();
    }
    
})

