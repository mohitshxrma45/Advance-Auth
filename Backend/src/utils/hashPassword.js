import argon2 from "argon2"

export const hashPassword = async (password) => {
    try {
        const hash = await argon2.hash(password);
        return hash;
    } catch (err) {
        console.log(err)
    }
}