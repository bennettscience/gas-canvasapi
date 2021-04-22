export class NotImplementedError extends Error {
    static classType = "NotImplementedError"
    
    constructor(message) {
        super(message)
        this.name = "NotImplementedError"
    }
}