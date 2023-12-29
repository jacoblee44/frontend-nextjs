interface Env {
    Production: boolean,
    Development: boolean,
    Test: boolean,
}

export const env: Env = {
    Production: process.env.NODE_ENV === "production",
    Development: process.env.NODE_ENV === "development",
    Test: process.env.NODE_ENV === "test",
};