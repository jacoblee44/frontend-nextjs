import { ChangeEvent, useEffect, useState } from "react";

export interface OptionProps {
    resetValue?: any,
    validate?: ((value: any) => string | true) | undefined,
    required?: string | boolean,

    onChange?(value: any): void,
}

export function useInput<T>(initialValue: T, options: OptionProps | undefined = undefined) {
    const [initialBoot, setInitialBoot] = useState<boolean>(true);
    const [value, setValue] = useState<any>(initialValue);
    const [error, setError] = useState<null | string>(null);
    const [hasError, setHasError] = useState<boolean>(false);

    const handleChangeValue = (text: any) => {
        setValue(text);
    };

    const handleSetError = (text: string | null | undefined = '') => {
        const errorStatus = (!text || text?.toString()?.trim() === '') ? null : text;

        setError(errorStatus);
        setHasError(errorStatus !== null);
    };

    const checkRequired = () => {
        if (options?.required) {
            const errorMessage = typeof options?.required === "string" ? options?.required : 'This field is required';

            if (!value || value?.toString()?.trim() === "") {
                return errorMessage;
            }
        }

        return null;
    };

    const checkValidator = () => {
        if (options?.validate && typeof options?.validate === "function") {
            const validated = options?.validate(value);
            return typeof validated === "string" && validated !== "" ? validated : null;
        }

        return null;
    };

    const updateError = (callback: ((error: boolean) => void) | undefined = undefined) => {
        let __hasError = false;
        if (options?.required && !options?.validate) {
            const checkedError = checkRequired();
            setError(checkedError);
            setHasError(checkedError !== null);
            __hasError = checkedError !== null;
        }

        if (options?.validate) {
            const checkedError = checkValidator();
            setError(checkedError);
            setHasError(checkedError !== null);
            __hasError = checkedError !== null;
        }

        if(callback) {
            callback(__hasError);
        }
    };

    const checkHasError = () => {
        if (checkRequired() || checkValidator()) {
            setHasError(true);
        } else {
            setHasError(false);
        }
    };

    const check = () => {
        let __hasError = hasError;

        if (hasError) {
            updateError((er) => {
                __hasError = er;
            });
            setInitialBoot(false);
        }

        return __hasError;
    };

    useEffect(() => {
        if (!initialBoot) {
            updateError();
        }

        checkHasError();
    }, [value]);

    useEffect(() => {
        setValue(initialValue);
        setError(null);
    }, [initialValue]);

    return {
        value,
        setValue: handleChangeValue,
        reset: () => {
            setInitialBoot(true);
            setValue(options?.resetValue ?? initialValue);
            setHasError(false);
            setError(null);
        },
        bind: {
            value,
            onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
                const inputValue = e.target.value;
                setValue(inputValue);
                if (initialBoot) {
                    setInitialBoot(false);
                }

                if (options?.onChange) {
                    options?.onChange(inputValue);
                }
            },
        },
        error: {
            error: error !== null,
            message: error,
            initialValidationMessage: checkValidator() ?? checkRequired() ?? '',
            check,
        },
        setError: handleSetError,
    };
}