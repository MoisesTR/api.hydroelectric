export interface SqlError {
    class: number;
    code: string;
    lineNumber: number;
    message: string;
    name: String;
    number: number;
    originalError: string;
    procName: string;
    serverName: string;
    state: number;
    stack?: string;
}

export class SqlException extends Error {
    cause: SqlError;

    constructor(error: SqlError) {
        super(error.message);
        this.cause = error;
    }
}
