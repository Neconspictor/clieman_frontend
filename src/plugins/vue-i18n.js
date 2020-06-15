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
        save: 'Save',
        toolbar: 'Toolbar',

        clients: 'Clients',

        placeholders: {
            addTitle: 'Add title',
            addDesc: 'Add description',
            search: 'Start typing to search',
        },

        date: 'Date',
        startTime: 'Start time',
        duration: 'Duration',

        messages: {
            assertEventDeletion: 'Do you really want to delete this event?',
        },

        yes: 'Yes',
        no: 'No',
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
        save: 'Speichern',
        toolbar: 'Werkzeugleiste',

        clients: 'Klienten',

        placeholders: {
            addTitle: 'Titel hinzufügen',
            addDesc: 'Beschreibung hinzufügen',
            search: 'Tippe um zu suchen',
        },

        date: 'Datum',
        startTime: 'Uhrzeit',
        duration: 'Dauer',

        messages: {
            assertEventDeletion: 'Möchtest du wirklich diesen Termin löschen?',
        },

        yes: 'Ja',
        no: 'Nein',
    },
}

export default new VueI18n({ locale: 'en', messages })
