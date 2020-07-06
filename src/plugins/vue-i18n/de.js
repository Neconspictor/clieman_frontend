export default {
    messages: {
        calendar: 'Kalender',
        today: 'Heute',
        jumpToToday: 'Zum heutigen Tag',
        viewMode: 'Ansicht',
        viewModes: {
            month: 'Monat',
            fourDays: '4 Tage',
            week: 'Woche',
            day: 'Tag',
        },
        createNewEvent: 'Einen neuen Termin erstellen',

        accept: 'Annehmen',
        close: 'Schließen',
        cancel: 'Abbrechen',
        create: 'Erstellen',
        delete: 'Löschen',
        discard: 'Verwerfen',
        edit: 'Ändern',
        save: 'Speichern',
        toolbar: 'Werkzeugleiste',

        clients: 'Klienten',

        placeholders: {
            addTitle: 'Titel hinzufügen',
            addDesc: 'Beschreibung hinzufügen',
            addClient: 'Klienten hinzufügen',
        },

        date: 'Datum',
        startTime: 'Uhrzeit',
        duration: 'Dauer',

        messages: {
            assertEventDeletion: 'Möchtest du wirklich diesen Termin löschen?',
            assertClientDeletion:
                'Möchtest du wirklich diesen Klienten löschen?',
        },

        yes: 'Ja',
        no: 'Nein',

        expanded: 'Offen',
        closed: 'Zu',

        clientData: {
            name: 'Name',
            forename: 'Vorname',
            email: 'E-mail',
            title: 'Titel',
            sex: 'Geschlecht',
            address: 'Addresse',
            mobile: 'Telefon',
            birthday: 'Geburtstag',
            id: 'ID',

            placeholders: {
                name: 'Nachname angeben',
                forename: 'Vorname angeben',
                email: 'E-mail angeben',
                title: 'Titel angeben',
                sex: 'Geschlecht auswählen',
                address: 'Adresse angeben',
                mobile: 'Telefon-/Handynummer angeben',
                birthday: 'Geburtstag auswählen',
            },

            validators: {
                email: 'E-mail Adresse fehlerhaft',
                mobile: 'Fehlerhafte Telefon-/Handynummer',
            },
        },

        male: 'Männlich',
        female: 'Weiblich',
        diverse: 'Divers',

        light: 'Hell',
        dark: 'Dunkel',
        nightmode: 'Nachtmodus',
        settings: 'Einstellungen',

        register: 'Registrieren',
        registerHeader: 'Registrierung',
        createAccount: 'Konto erstellen',
        login: 'Anmelden',
        loginNoun: 'Anmeldung',
        logout: 'Abmelden',
        username: 'Benutzername',
        password: 'Passwort',
        notHavingAnAccount: 'Noch kein Konto?',
        havingAnAccount: 'Schon ein Konto vorhanden?',
        hidePassword: 'Passwort verbergen',
        showPassword: 'Passwort anzeigen',

        registerData: {
            accountCreated: 'Konto erstellt!',
            sendEmailTo: 'Eine E-mail wurde geschickt an: ',
            verifyAccount:
                'Bitte aktiviere dein Konto indem du auf den Aktivierungslink in der gesendeten E-mail klickst.',
            emailRequired: 'E-mail wird benötigt.',
            emailRequiredUserName: 'E-mail braucht einen Benutzernamen.',
            emailRequiresAt: 'E-mail muss ein @ Symbol beinhalten',
            emailValidDomain: 'E-mail muss eine gültige Domain beinhalten.',
            emailDomainExtension:
                'E-mail muss eine gültige Domain Endung enthalten.',
            passwordRequired: 'Passwort wird benötigt.',
            passwordTooShort: 'Passwort ist zu kurz (Mindestens 8 Zeichen).',
            confirmPassword: 'Passwort bestätigen',
            passwordsDontMatch: 'Passwörter stimmen nicht überein.',
            confirmationRequired: 'Bestätigung wird benötigt.',
        },

        language: 'Sprache',
        email: 'E-mail',
        account: 'Konto',

        optional: 'optional',

        editData: {
            password: 'Passwort ändern',
            email: 'E-mail ändern',
            username: 'Benutzername ändern',
        },

        clientListData: {
            createNewClient: 'Einen neuen Klienten hinzufügen',
            sortAscending: 'Aufsteigend sortieren',
            sortDescending: 'Absteigend sortieren',
            search: 'Durchsuchen',
            page: 'Seite',
            of: 'von',
            itemsPerPage: 'Ergebnisse pro Seite',
        },

        settingsData: {
            selectLanguage: 'Sprache auswählen',
            oldPassword: 'Altes Passwort',
            newPassword: 'Neues Passwort',
            confirmNewPassword: 'Neues Passwort bestätigen',

            passwordDesc:
                'Du solltest ein sicheres Passwort verwenden, das du nirgendwo sonst verwendest.',
        },

        errors: {
            invalidLogin:
                'Anmeldung ist fehlgeschlagen. Bitte versuche es noch einmal.',
            noEmail: 'Keine E-mail Adresse angegeben.',
            emailAlreadyExists:
                'Ein Konto mit dieser E-mail Adresse existiert bereits.',
            userNameAlreadyExists:
                'Ein Konto mit diesem Benutzernamen existiert bereits.',
            passwordTooShort: 'Passwort ist zu kurz.',

            invalidOldPassword: 'Altes Passwort ist inkorrekt.',
            newPasswordTooShort: 'Neues Passwort ist zu kurz.',
            invalidConfirmationPassword:
                'Bestätigungspasswort stimmt nicht mit dem neuen Passwort überein.',
            'Error: Network Error': 'Netzwerkfehler',
            noEventsFetched: 'Termine konnten nicht heruntergeladen werden.',
            noClientsFetched:
                'Informationen zu den Klienten konnten nicht heruntergeladen werden.',
            'Error: Request failed with status code 400': 'Ungültige Anfrage',
            'Error: Request failed with status code 401':
                'Nicht authorisierte Anfrage',
            'Error: Request failed with status code 500':
                'Interner Server-Fehler',

            noUserName: 'Kein Benutzername angegeben.',

            noValidEmail:
                'Die angegebene E-mail-Adresse ist keine gültige E-mail-Adresse',

            clientsNotValid: 'Klientenliste enthält ungültige Einträge',

            noExistingEventFound: 'Kein gültiger Termin gefunden.',

            noId: 'Keine ID gefunden.',

            idAlreadyExists: 'ID schon vergeben.',
            noMatchingIdFound: 'Keine übereinstimmende ID gefunden.',
        },
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
