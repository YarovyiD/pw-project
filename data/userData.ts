export const usersData = {
    standard: { username: 'standard_user', password: 'secret_sauce' },
    locked: { username: 'locked_out_user', password: 'secret_sauce' },
} as const;

export const errorMessages = {
    lockedOut : 'Epic sadface: Sorry, this user has been locked out.',
    userNameRequired : 'Epic sadface: Username is required',
    passwordRequired : 'Epic sadface: Password is required'
} as const;