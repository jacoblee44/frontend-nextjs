interface ThunkResponse {
    success: boolean,
    error: boolean,
    status: number,
    headers: any,
    data: any,
    statusText: any,
}

export function parseThunkResponse(response: any): ThunkResponse {
    let success: boolean = true;
    let error: boolean = false;
    let status: number = 200;
    let headers: any = null;
    let data: any = null;
    let statusText: any = null;

    if(response?.error && response?.error !== '') {
        success = false;
        error = true;
    }

    if(response?.payload && response?.payload) {
        let res = response?.payload;

        if(error) {
            res = response?.payload?.response;
        }

        if(res?.headers) {
            headers = res?.headers;
        }

        if(res?.status) {
            status = res?.status;
        }

        if(res?.data) {
            data = res?.data;
        }

        if(res?.statusText) {
            statusText = res?.statusText;
        }
    }

    return {
        success,
        error,
        status,
        headers,
        data,
        statusText,
    }
}