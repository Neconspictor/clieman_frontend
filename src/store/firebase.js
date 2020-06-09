// eslint-disable-next-line no-unused-vars
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
    init: function() {
        const firebaseConfig = {
            apiKey: 'AIzaSyA4yYD2RAUu1T9DuWP_LMnqptKGkYcFTfE',
            authDomain: 'calendar-test-3ff4d.firebaseapp.com',
            databaseURL: 'https://calendar-test-3ff4d.firebaseio.com',
            projectId: 'calendar-test-3ff4d',
            storageBucket: 'calendar-test-3ff4d.appspot.com',
            messagingSenderId: '617959689199',
            appId: '1:617959689199:web:b094a90677a548f80b041a',
        }

        firebase.initializeApp(firebaseConfig)
        return firebase.firestore()
    },
}
