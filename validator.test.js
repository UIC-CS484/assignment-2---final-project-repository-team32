const passwordValidator = require('./validator.js')

const commonPasswords = ["Password123","Passw0rd"];

test('validation returns false on password with space', () => {
    expect(
        passwordValidator("pass worD12").isValid
    ).toBe(false)
})

test('validation returns false on password with no letters', () => {
    expect(
        passwordValidator("123123123123").isValid
    ).toBe(false)
})

test('validation returns false on password with no digits', () => {
    expect(
        passwordValidator("mypasswORD").isValid
    ).toBe(false)
})

test('validation returns false on password with no uppercase', () => {
    expect(
        passwordValidator("password12345").isValid
    ).toBe(false)
})

test('validation returns false on password with no lowercase', () => {
    expect(
        passwordValidator("PASSWORD1234").isValid
    ).toBe(false)
})

test('validation returns false on blacklisted password', () => {
    expect(
        passwordValidator(commonPasswords[0]).isValid
    ).toBe(false)
})

test('validation returns false on blacklisted password', () => {
    expect(
        passwordValidator(commonPasswords[1]).isValid
    ).toBe(false)
})

test('validation returns false on short password', () => {
    expect(
        passwordValidator("MYpass3").isValid
    ).toBe(false)
})

test('validation returns true on passwords passing all checks #1', () => {
    expect(
        passwordValidator("PASSw0rd").isValid
    ).toBe(true)
})

test('validation returns true on passwords passing all checks #2', () => {
    expect(
        passwordValidator("th1sIsV3ryCrypt1c").isValid
    ).toBe(true)
})

test('validation returns true on passwords passing all checks #3', () => {
    expect(
        passwordValidator("cs484::Project3").isValid
    ).toBe(true)
})