import {render, screen} from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test("displays the primary language of the repository", () => {
    const repository = {
        stargazers_count: 5, open_issues: 1, forks: 30, language: 'Javascript'
    } 
    render(<RepositoriesSummary repository={repository} />)
    
    const language = screen.getByText("Javascript");
    for(let key in repository) {
        const value = repository[key];
        const element = screen.getByText(new RegExp(value));
        expect(element).toBeInTheDocument();
    }
})