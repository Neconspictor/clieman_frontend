import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
    en: {
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
    },

    de: {
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
    },
}

const dateTimeFormats = {
    en: {
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

    de: {
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
export default new VueI18n({ locale: 'en', messages, dateTimeFormats })
