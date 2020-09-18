export interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
}

export interface FormIStatus {
    message: string
    type: string
}
export interface FormIStatusProps {
    [key: string]: FormIStatus
}
