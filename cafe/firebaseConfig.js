const firebaseApp = firebase.initializeApp({ 
    apiKey: "AIzaSyD0gwfQEKScE9IZa-Oef7vcg7geLM64dKg",
    authDomain: "one-page-6493b.firebaseapp.com",
    projectId: "one-page-6493b",
    storageBucket: "one-page-6493b.appspot.com",
    messagingSenderId: "930712175664",
    appId: "1:930712175664:web:d98a8445a19a20851f59f5"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '/index.html', //登入成功後跳至index
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    // Terms of service url.
    tosUrl: '/terms.html', //跳至服務條款頁面
    // Privacy policy url.
    privacyPolicyUrl: '/privacy.html' //跳至隱私條款
    };
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);