export default {
    messages: {
        calendar: 'Calendar',
        today: 'Today',
        viewMode: 'View mode',
        viewModes: {
            month: 'Month',
            fourDays: '4 days',
            week: 'Week',
            day: 'Day',
        },
        jumpToToday: 'Jump to today',
        createNewEvent: 'Create a new event',

        close: 'Close',
        cancel: 'Cancel',
        create: 'Create',
        delete: 'Delete',
        discard: 'Discard',
        edit: 'Edit',
        save: 'Save',
        toolbar: 'Toolbar',

        clients: 'Clients',

        placeholders: {
            addTitle: 'Add title',
            addDesc: 'Add description',
            addClient: 'Add client',
        },

        date: 'Date',
        startTime: 'Start time',
        duration: 'Duration',

        messages: {
            assertEventDeletion: 'Do you really want to delete this event?',
            assertClientDeletion: 'Do you really want to delete this client?',
        },

        yes: 'Yes',
        no: 'No',

        expanded: 'Expanded',
        closed: 'Closed',

        clientData: {
            name: 'Name',
            forename: 'Forename',
            email: 'E-mail',
            title: 'Title',
            sex: 'Sex',
            address: 'Address',
            mobile: 'Mobile',
            birthday: 'Birthday',
            id: 'ID',
            placeholders: {
                name: 'Enter a family name',
                forename: 'Enter a forename',
                email: 'Enter an e-mail',
                title: 'Enter a title',
                sex: 'Select a sex',
                address: 'Enter an address',
                mobile: 'Enter a mobile/telephone number',
                birthday: 'Select a birthday date',
            },

            validators: {
                email: 'E-mail is not valid',
                mobile: 'Telephone/mobile number is not valid',
            },
        },

        male: 'Male',
        female: 'Female',
        diverse: 'Diverse',

        light: 'Light',
        dark: 'Dark',
        nightmode: 'Night mode',
        settings: 'Settings',

        register: 'Register',
        registerHeader: 'Register',
        createAccount: 'Create account',
        login: 'Login',
        loginNoun: 'Login',
        logout: 'Logout',
        username: 'User name',
        password: 'Password',

        notHavingAnAccount: 'Not having an account, yet?',
        havingAnAccount: 'Already having an account?',
        hidePassword: 'Hide password',
        showPassword: 'Show password',

        registerData: {
            accountCreated: 'Account created!',
            sendEmailTo: 'We send an e-mail to: ',
            verifyAccount:
                'Please activate your account by opening the e-mail and entering the verification in the following input field.',
            emailRequired: 'E-mail is required.',
            emailRequiredUserName: 'E-mail should have a user name',
            emailRequiresAt: 'E-mail should include an @ symbol',
            emailValidDomain: 'E-mail should contain a valid domain.',
            emailDomainExtension:
                'E-mail should contain a valid domain extenion.',
            passwordRequired: 'Password is required.',
            passwordTooShort: 'Password is too short (Minimal 8 characters).',
            confirmPassword: 'Confirm password',
            passwordsDontMatch: "Passwords don't match.",
            confirmationRequired: 'Confirmation is required',

            submitVerification: 'Verify account',
            verificationCode: 'verification code',
            accountVerified: 'Account verified!',
            ableToLogin:
                "Your account has been successfully verified. You're now able to login with your credentials.",
            toLogin: 'to login page',
            verifyHeader: 'Account verification',
            sendEmail: 'Send verification code',
            wantToVerify: 'Want to verify your account?',
        },

        language: 'Language',
        email: 'E-mail',

        account: 'Account',

        optional: 'optional',

        editData: {
            password: 'Change password',
            email: 'Edit E-mail',
            username: 'Edit user name',
        },

        clientListData: {
            createNewClient: 'Add a new client',
            sortAscending: 'Sort ascending',
            sortDescending: 'Sort descending',
            search: 'Search',
            page: 'Page',
            of: 'of',
            itemsPerPage: 'Results per page',
        },

        settingsData: {
            selectLanguage: 'Select language',
            oldPassword: 'Old Password',
            newPassword: 'New Password',
            confirmNewPassword: 'Confirm new password',

            passwordDesc:
                "You should use a secure password that you don't use anywhere else",

            activeWorkingHours: 'Active working hours',
            deleteAccount: 'Delete account',
            deleteAccountDescription:
                'Deletes your account and all of your data permanently.',
            password: 'Password',
        },

        errors: {
            InvalidLogin: 'Invalid login. Please try again.',
            NoEmail: 'E-mail is not specified.',
            EmailAlreadyExists: 'An account with this email already exists.',
            UserNameAlreadyExists:
                'An account with this user name already exists.',
            PasswordTooShort: 'Password too short.',
            InvalidOldPassword: 'Old password is invalid.',
            NewPasswordTooShort: 'New password is too short',
            InvalidConfirmationPassword:
                'Confirmation password does not match with new password.',
            'Error: Network Error': 'Network error.',
            NoEventsFetched: "Couldn't fetch events.",
            NoClientsFetched: "Couldn't fetch clients.",
            'Error: Request failed with status code 400': 'Bad request',
            'Error: Request failed with status code 401':
                'Unauthorized request',
            'Error: Request failed with status code 500':
                'Internal server error',

            NoUserName: 'No user name specified.',

            NoValidEmail: 'Specified Email address is not a valid email.',

            ClientsNotValid: 'Client list consists of invalid entries.',

            NoExistingEventFound: 'No valid event found.',
            NoExistingClientFound: 'No valid client found.',

            NoId: 'No ID found.',

            IdAlreadyExists: 'ID already exists.',
            NoMatchingIdFound: 'No matching ID was found.',
            ClientIsReferencedByEvents:
                'There exist still events that reference this client.',
            TokenIsNotValid: 'Verification code is not valid.',

            BadCredentials: 'No account found matching the given credentials.',
            UserIsDisabled: 'User is not verified.',
            UserNotFound: 'User account was not found.',
            UserIsNotDisabled: 'User account is already verified.',
            'Error: Request failed with status code 404':
                "Request couldn't be processed (status code: 404)",
            OldPasswordNotMatching: 'Old password is not right.',
            NewPasswordConfirmationNotMatching:
                "New password and confirmation password don't match",
            PasswordWrong: 'Password is wrong',
            ClientCannotBeDeleted:
                'Client cannot be deleted. Properly there are some events referencing the client.',
        },

        verify: 'verify',
    },

    dateTimeFormats: {
        default: {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        },
        birthday: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        },

        event: {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        },
    },
}
