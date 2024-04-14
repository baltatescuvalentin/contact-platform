export type RegisterFormType = {
    email: string,
    username: string,
    firstname: string,
    lastname: string,
    password: string,
}

export type LoginFormType = {
    username: string,
    password: string,
}

export type LocalsUserType = {
    email: string,
    firstname: string,
    lastname: string,
}

export type AddContactFormType = {
    phone: string,
    firstname: string,
    lastname: string,
    email: string,
    county: string,
    city: string,
    street: string,
    block: string,
    entrance: string,
    apartment: string,
}

export type ContactInfoType = {
    email: string,
    phone: string,
    firstname: string,
    lastname: string,
    contactUUID: string,
}