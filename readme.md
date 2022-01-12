# The Weather

URL: https://theweather484.herokuapp.com/

The Weather is a web application that allows users to search for any city's current weather.

It also allows users to log in and select a city (as a "home" address).

Furthermore, a user may delete his account and or update his name or city.

Additionally, a chart displays a seven-hour forecast of the searched city. (Currently, the chart only displays the forecast of Chicago.)

(Not implemented: the homepage will show weather of the user's city.)

## Mission and goals
Our site's goal is to provide a clean and easy to use interface for accessing weather information.

It was also built for us to get acquainted with web development.

## Member roles and bios
Tasks were shared, but task direction was done as follows.
### Aman Yousuf Mohammed

- [amoham96@uic.edu](amoham96@uic.edu)
- [https://github.com/amoham96](https://github.com/amoham96)
- Tooling (Docker, GitHub Actions), deployment, authentication, frontend, charting

### Yusuf Khan

- [ykhan21@uic.edu](ykhan21@uic.edu)
- [https://github.com/ykhan21](https://github.com/ykhan21)
- Routing, API connection, database administration, testing, MVC structuring of project

## Tools and resources
- [Web Dev Simplified](https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw)
- [Portexe](https://portexe.com/)
- [CS484 Course Site](https://cs-uic.pages.dev/docs/syllabus_cs484)
- Tools: VSCode and plugins, GitHub, Heroku, DB Browser for SQLite

## Interaction with API
![API interaction 1](./api1.png)

![API interaction 2](./api2.png)


## ERD Diagram

![ERD diagram](./erd.png)

## Testing Strategy

The current tests test the passwordValidator function in validator.js. So far, this is the only file (and function) that contains application logic.

The tests may be found in validator.test.js. Above each test is description of what it tests for. See the end of this file for the descriptions here.

8 tests test passwords that should result in a failure. These tests ensure that a password that does not meet any condition is rejected.

3 tests test passwords that meet the conditions.

The conditions are:

1. no spaces,
2. contains letters,
3. contains digits,
4. contains an uppercase letter,
5. contains a lowercase letter,
6. is not on a blacklist of common passwords, and
7. length no less than 8.

There is currently full coverage, as this so far is the only file (and function) with logic as shown by "jest --coverage".

### Test Descriptions

√ validation returns false on password with space (1 ms)

√ validation returns false on password with no letters

√ validation returns false on password with no digits

√ validation returns false on password with no uppercase

√ validation returns false on password with no lowercase

√ validation returns false on blacklisted password (1 ms)

√ validation returns false on blacklisted password

√ validation returns false on short password

√ validation returns true on passwords passing all checks #1

√ validation returns true on passwords passing all checks #2

√ validation returns true on passwords passing all checks #3
