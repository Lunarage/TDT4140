import fetch, { Response } from "node-fetch";
import { Credentials, AuthenticationResponse, CustomError } from "./types";

/**
 * A custom error for response codes that are not 2xx
 *
 * @extends Error
 */
class HttpRequestError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.name = "HttpRequestError";
        this.message = message;
        this.statusCode = statusCode;
    }
}

class HttpClient {
    private baseURL: string;
    private headers: {};

    constructor(
        baseURL: string,
        userToken: string | null = null,
        formData: boolean = false
    ) {
        this.baseURL = baseURL;
        if (formData) {
            // special case for http request with images
            this.headers = {
                Authorization: "Token " + userToken,
            };
        } else if (userToken != null) {
            this.headers = {
                "Content-Type": "application/json",
                "Authorization": "Token " + userToken,
            };
        } else {
            this.headers = {
                "Content-Type": "application/json",
            };
        }
    }

    // Specific functions
    /**
     * Retreives the authentication token and other info for a user.
     *
     * @param {Authentication} authentication - Authentication details
     * @return {Promise<AuthenticationResponse>} Promise of response
     */
    public getUserToken(
        credentials: Credentials
    ): Promise<AuthenticationResponse | CustomError> {
        return this.post<AuthenticationResponse>(
            "/api/token-auth",
            credentials
        );
    }

    // Helper Functions
    /**
     * Checks the response code and throws an error if it is not 2xx.
     * Otherwise it just returns the response.
     *
     * @param {Response} response - Object that represents the HTTP response
     * @throws {HttpRequestError} - Error Object
     */
    private checkStatus(response: Response) {
        if (response.ok) {
            return response;
        } else {
            throw new HttpRequestError(response.status, response.statusText);
        }
    }

    // Generic Functions
    /**
     * Sends a get request to the specified url
     * and returns a promise of a result
     * with the expected type.
     * Throws an error if the url can't be reached
     * or the response code is not 2xx
     *
     * @template T - The expected type of the response
     * @param {string} url - The url to send the request to
     * @return {Promise<T>} The promise of a response
     */
    public get<T>(url: string): Promise<CustomError | T> {
        return fetch(this.baseURL + url, {
            method: "GET",
            headers: this.headers,
        })
            .then(this.checkStatus)
            .then((response: any) => response.json())
            .then((response: any) => {
                return response as T;
            })
            .catch((err) => {
                return {
                    error: {
                        name: err.name,
                        message: err.message,
                        statusCode: err.statusCode,
                    },
                };
            });
    }

    /**
     * Sends a delete request to the specified url
     * and returns a promise of a result
     * with the expected type.
     * Throws an error if the url can't be reached
     * or the response code is not 2xx
     *
     * @template T - The expected type of the response
     * @param {string} url - The url to send the request to
     * @return {Promise<T>} The promise of a response
     */
    public delete<T>(url: string): Promise<CustomError | T> {
        return fetch(this.baseURL + url, {
            method: "DELETE",
            headers: this.headers,
        })
            .then(this.checkStatus)
            .then((response: any) => response.status)
            .then((response: any) => {
                return response as T;
            })
            .catch((err) => {
                return {
                    error: {
                        name: err.name,
                        message: err.message,
                        statusCode: err.statusCode,
                    },
                };
            });
    }

    /**
     * Sends a post request to the specified url
     * and returns a promise of a result
     * with the expected type.
     * Throws an error if the url can't be reached
     * or the response code is not 2xx
     *
     * @template T - The expected type of the response
     * @param {string} url - The url to send the request to
     * @return {Promise<T>} The promise of a response
     */
    public post<T>(url: string, body: any): Promise<CustomError | T> {
        return fetch(this.baseURL + url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: this.headers,
        })
            .then(this.checkStatus)
            .then((response: any) => response.json())
            .then((response: any) => {
                return response as T;
            })
            .catch((err) => {
                return {
                    error: {
                        name: err.name,
                        message: err.message,
                        statusCode: err.statusCode,
                    },
                };
            });
    }

    /**
     * Same as above, but with formData because of image
     *
     * @template T - The expected type of the response
     * @param {string} url - The url to send the request to
     * @return {Promise<T>} The promise of a response
     */
    public postWithImage<T>(url: string, body: any): Promise<CustomError | T> {
        return fetch(this.baseURL + url, {
            method: "POST",
            body: body,
            headers: this.headers,
        })
            .then(this.checkStatus)
            .then((response: any) => response.json())
            .then((response: any) => {
                return response as T;
            })
            .catch((err) => {
                return {
                    error: {
                        name: err.name,
                        message: err.message,
                        statusCode: err.statusCode,
                    },
                };
            });
    }

    /**
     * Sends a put request to the specified url
     * and returns a promise of a result
     * with the expected type.
     * Throws an error if the url can't be reached
     * or the response code is not 2xx
     *
     * @template T - The expected type of the response
     * @param {string} url - The url to send the request to
     * @return {Promise<T>} The promise of a response
     */
    public put<T>(url: string, body: any): Promise<CustomError | T> {
        return fetch(this.baseURL + url, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: this.headers,
        })
            .then(this.checkStatus)
            .then((response: any) => response.status)
            .then((response: any) => {
                return response as T;
            })
            .catch((err) => {
                return {
                    error: {
                        name: err.name,
                        message: err.message,
                        statusCode: err.statusCode,
                    },
                };
            });
    }
}

// Construct and export the client
export default HttpClient;
