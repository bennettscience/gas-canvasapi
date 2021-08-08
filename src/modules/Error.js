export class NotImplementedError extends Error {
    static classType() { return "NotImplementedError" }

    constructor(message) {
        super(message)
        this.name = "NotImplementedError"
    }
}

export class IncompleteRequestError extends Error {
    static classType() { return "IncompleteRequestError" }

    constructor(message) {
        super(message)
        this.name = "IncompleteRequestError"
    }
}

export class MissingRequriedFieldError extends Error {
    static classType() { return "MissingRequiredFieldError" }

    constructor(message) {
        super(message)
        this.name = "MissingRequiredFieldError"
    }
}