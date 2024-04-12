export default interface User{
    _id:string,
    name:string,
    email: string,
    mobile: number,
    password: string,
    confirmPassword: string,
    avatar: string,
    wishlist: string[],
    isBlocked: boolean,
    cart: string[],
            createdAt: string,
            updatedAt: string,
            roleIds: string,
            __v: number,
            oldPassword: string
}