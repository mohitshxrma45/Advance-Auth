import argon2 from 'argon2'



export const comparePassword = async (hashedPassword, plainPassword) => {
    try {
        return await argon2.verify(hashedPassword, plainPassword)
    } catch (err) {
        console.log("Password Comparison Error:", err)
        return false
    }
}