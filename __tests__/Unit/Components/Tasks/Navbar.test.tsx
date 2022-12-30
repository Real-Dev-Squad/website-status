import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "@/components/navBar";
import {
  LOGIN_URL,
  HOME_URL,
  WELCOME_URL,
  EVENTS_URL,
  CRYPTO_URL,
  MEMBERS_URL,
  STATUS_URL,
} from "@/components/constants/url";

describe("Checking whether components are in place.", () => {
  test("whether navbar is present or not", () => {
    render(<Navbar />);

    const hamElement = screen.getByRole("navigation");
    expect(hamElement).toBeInTheDocument();
  });

  test("whether drawer and signIn button is present on the navbar", () => {
    render(<Navbar />);

    const hamElement = screen.getByTitle(/ham/i);
    expect(hamElement).toBeInTheDocument();

    const signInButton = screen.getByTitle(/signIn/i);
    expect(signInButton).toBeInTheDocument();
  });

  test("whether all the routing links are present in the drawer", () => {
    render(<Navbar />);
    const home_link = screen.getByTitle(/home/i);
    const welcome_link = screen.getByTitle(/welcome/i);
    const crypto_link = screen.getByTitle(/crypto/i);
    const members_link = screen.getByTitle(/members/i);
    const events_link = screen.getByTitle(/events/i);
    const status_link = screen.getByTitle(/status/i);

    expect(home_link).toBeInTheDocument();
    expect(welcome_link).toBeInTheDocument();
    expect(members_link).toBeInTheDocument();
    expect(status_link).toBeInTheDocument();
    expect(events_link).toBeInTheDocument();
    expect(crypto_link).toBeInTheDocument();
  });
});

describe("Testing the working of the drawer", () => {
  test("whether drawer is opening and closing when ham or cross button clicked", () => {
    render(<Navbar />);

    const drawer = document.getElementById("drawer");
    const hamElement = screen.getByTitle(/ham/i);
    const cancelButton = screen.getByTitle(/cancel/i);

    fireEvent.click(hamElement);
    expect(drawer?.style.left).toBe("0px");

    fireEvent.click(cancelButton);
    expect(drawer?.style.left).toBe("-100%");
  });
});

describe("Testing navigation.", () => {
  test("whether links have correct url.", () => {
    render(<Navbar />);

    // FOR HOME
    expect(screen.getByTitle("home")).toHaveAttribute("href", HOME_URL);

    // FOR WELCOME SITE
    expect(screen.getByTitle("welcome")).toHaveAttribute("href", WELCOME_URL);

    // FOR CRYPTO SITE
    expect(screen.getByTitle("crypto")).toHaveAttribute("href", CRYPTO_URL);

    // FOR MEMBERS SITE
    expect(screen.getByTitle("members")).toHaveAttribute("href", MEMBERS_URL);

    // FOR EVENTS SITE
    expect(screen.getByTitle("events")).toHaveAttribute("href", EVENTS_URL);

    // FOR STATUS SITE
    expect(screen.getByTitle("status")).toHaveAttribute("href", STATUS_URL);

    // FOR LOGIN/SIGNUP using github.
    expect(screen.getByTitle("signIn")).toHaveAttribute("href", LOGIN_URL);
  });
});
