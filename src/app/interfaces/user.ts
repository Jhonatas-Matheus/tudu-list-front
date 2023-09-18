export interface CreateUserDto {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    confirm_password: string
}

export interface LoginUserDto{
    email: string,
    password: string
}

export interface ResponseValidateToken {
    success: boolean;
    data:    Data;
}

export interface Data {
    allow_password_change:       boolean;
    email:                       string;
    first_name:                  string;
    last_name:                   string;
    firebaseId:                  null;
    locker_locked_at:            null;
    locker_locking_name:         null;
    locking_name:                null;
    provider:                    string;
    reset_password_redirect_url: null;
    task_ids:                    any[];
    uid:                         string;
    id:                          string;
}


export interface ResponseCreateUserDto{
    status: string;
    data:   DataRegisterResponse;
}

export interface ResponseLoginUserDto {
    status: boolean
    data: DataLoginResponse;
}

export interface DataLoginResponse {
    allow_password_change:       boolean;
    email:                       string;
    firebaseId:                  null;
    locker_locked_at:            null;
    locker_locking_name:         null;
    locking_name:                null;
    provider:                    string;
    reset_password_redirect_url: null;
    task_ids:                    TaskID[];
    uid:                         string;
    id:                          string;
}

export interface TaskID {
    $oid: string;
}


export interface DataRegisterResponse {
    allow_password_change:       boolean;
    created_at:                  string;
    email:                       string;
    firebaseId:                  null;
    locker_locked_at:            null;
    locker_locking_name:         null;
    locking_name:                null;
    provider:                    string;
    reset_password_redirect_url: null;
    task_ids:                    any[];
    uid:                         string;
    updated_at:                  string;
    id:                          string;
}

