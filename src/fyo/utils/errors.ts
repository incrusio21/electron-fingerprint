export class BaseError extends Error {
    more: Record<string, unknown> = {};
    message: string;
    statusCode: number;
    shouldStore: boolean;
  
    constructor(statusCode: number, message: string, shouldStore = true) {
		super(message);
		this.name = 'BaseError';
		this.statusCode = statusCode;
		this.message = message;
		this.shouldStore = shouldStore;
    }
}

export class ValidationError extends BaseError {
	constructor(message: string, shouldStore = false) {
		super(417, message, shouldStore);
		this.name = 'ValidationError';
	}
}

export class NotFoundError extends BaseError {
    constructor(message: string, shouldStore = true) {
		super(404, message, shouldStore);
		this.name = 'NotFoundError';
    }
}

export class DuplicateEntryError extends ValidationError {
	constructor(message: string, shouldStore = false) {
		super(message, shouldStore);
		this.name = 'DuplicateEntryError';
	}
}
export class LinkValidationError extends ValidationError {
	constructor(message: string, shouldStore = false) {
		super(message, shouldStore);
		this.name = 'LinkValidationError';
	}
}

export class ValueError extends ValidationError {}