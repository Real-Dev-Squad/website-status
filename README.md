[![Better Uptime Badge](https://betteruptime.com/status-badges/v1/monitor/5huw.svg)](https://betteruptime.com/?utm_source=status_badge)


# Status website for Real Dev Squad

Displays the tasks and assignments that are ongoing.
# Tech Stack:
- NextJS (React)
- TS (TypeScript)

# Setup and running locally


Firstly setup [Volta](https://docs.volta.sh/guide/getting-started) | [Why Volta?](https://docs.volta.sh/guide/#why-volta)

[CONTRIBUTING.MD](https://github.com/Real-Dev-Squad/website-status/blob/develop/CONTRIBUTING.md)

1. Setup `dev.realdevsquad.com` for development using the instructions here - [Avoiding CORS during development](https://github.com/Real-Dev-Squad/website-code-docs/tree/main/docs/dev/https-dev-url-cors)
2. Run `yarn dev` 
3. Visit dev website: `https://dev.realdevsquad.com`

4. To enable mocking APIs for testing using [Mock Service worker](https://mswjs.io/), take the following steps:
- [Create a certificate](https://github.com/Real-Dev-Squad/website-status/blob/develop/__mocks__/INSTALL_CERTIFICATE.md) for the server and add it to the new folder `certificate` in the root of the project.
- Run the server with `yarn run dev:server`.
- Then, in `.env.development` file, replace `OFF` with `ON` in `NEXT_PUBLIC_API_MOCKING`
- Then go to https://dev.realdevsquad.com and you should see the "MOCKING ENABLED" message in the console.

# Website

- Status: https://status.realdevsquad.com/
- Homepage: https://www.realdevsquad.com/
