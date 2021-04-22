export class NotImplementedError extends Error {
    static classType() { return "NotImplementedError" }

    constructor(message) {
        super(message)
        this.name = "NotImplementedError"
    }
}