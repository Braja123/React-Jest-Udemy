import {render, screen, within} from "@testing-library/react";
import UserList from "./UserList";

function renderComponent() {
    const users = [
        {name: "sanu", email: "sanu@gmail.com"},
        {name: "dipa", email: "dipa@gmail.com"},
    ]
    render(<UserList users={users} />);

    return {
        users
    }
}

test("render one row per user----", () => {
    // Render the component
    renderComponent();
    // const {container} = render(<UserList users={users} />);

    // Find all the rows in the table
    // screen.logTestingPlaygroundURL();
    // This is more preferable compare to directly use querySelector
    const rows = within(screen.getByTestId("users")).getAllByRole("row");

    // eslint-disable-next-line
    // const rows = container.querySelectorAll("tbody tr");

    expect(rows).toHaveLength(2)

})

test("render the eamil and name of each user", () => {
     // Render the component
    //  const users = [
    //     {name: "sanu", email: "sanu@gmail.com"},
    //     {name: "dipa", email: "dipa@gmail.com"},
    // ]
    // render(<UserList users={users} />);
    const {users}  = renderComponent();
    // screen.logTestingPlaygroundURL();

    // check name and email is there in the table 
    for(let user of users) {
        let name = screen.getByRole('cell', {name: user.name})
        let email = screen.getByRole('cell', {name: user.email})

        expect(name).toBeInTheDocument()
        expect(email).toBeInTheDocument()
    }


})