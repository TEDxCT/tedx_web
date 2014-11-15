
AccountsTemplates.configure({
    // Behaviour
    confirmPassword: false,
    enablePasswordChange: true,

    // Appearance
    showAddRemoveServices: true,
    showForgotPasswordLink: true,
    showLabels: false,
    showPlaceholders: true,  

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/home',
    redirectTimeout: 4000,

    // Texts
    texts: {
      button: {
          signUp: "Register Now!"
      },
      socialSignUp: "Register",
      title: {
          forgotPwd: "Recover Your Passwod"
      },
    },
});

AccountsTemplates.addField({
    _id: 'fullname',
    type: 'text',
    placeholder: {
        signUp: "Your full name"
    },
    required: true,
});
