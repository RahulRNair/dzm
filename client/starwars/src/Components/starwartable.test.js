import { render, screen, cleanup, fireEvent, mount } from "@testing-library/react";
import StarwarTable from "./starwartable";
import { act } from "react-dom/test-utils";

afterEach(cleanup);

it("should render the component onto the screen", () => {
    render(<StarwarTable />);
    expect(screen.getByTestId("search-string")).toBeInTheDocument();
    expect(screen.getByTestId("clear-btn")).toBeInTheDocument();
    expect(screen.getByTestId("clear-btn")).toBeDisabled();
});
it("renders table data", async () => {
    const fakeData = {
        results: [
            {
                name: "Luke Skywalker",
                height: "172",
                mass: "77",
                hair_color: "blond",
                skin_color: "fair",
                eye_color: "blue",
                birth_year: "19BBY",
                gender: "male",
                created: "2014-12-09T13:50:51.644000Z",
                edited: "2014-12-20T21:17:56.891000Z",
                url: "https://swapi.dev/api/people/1/",
            },
        ],
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeData),
        })
    );

    // Use the asynchronous version of act to apply resolved promises

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
        render(<StarwarTable />);
    });

    expect(screen.getByTestId("sortable-table")).toBeInTheDocument();
    expect(screen.getByText(fakeData.results[0].name)).toBeInTheDocument();
});
it("renders and seacrh table data and clear", async () => {
    const fakeData = {
        results: [
            {
                name: "Luke Skywalker",
                height: "172",
                mass: "77",
                hair_color: "blond",
                skin_color: "fair",
                eye_color: "blue",
                birth_year: "19BBY",
                gender: "male",
                created: "2014-12-09T13:50:51.644000Z",
                edited: "2014-12-20T21:17:56.891000Z",
                url: "https://swapi.dev/api/people/1/",
            },
        ],
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeData),
        })
    );

    // Use the asynchronous version of act to apply resolved promises
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
        render(<StarwarTable />);
    });
    const search_string = screen.getByTestId("search-string");
    const clear_btn = screen.getByTestId("clear-btn");
    fireEvent.change(search_string, { target: { value: "xyz" } });
    expect(screen.getByTestId("message-block")).toBeInTheDocument();
    expect(
        screen.getByText(/No data found as per your search!/i)
    ).toBeInTheDocument();
    fireEvent.click(clear_btn)
    expect(screen.getByTestId("sortable-table")).toBeInTheDocument();
    expect(screen.getByText(fakeData.results[0].name)).toBeInTheDocument();
});

