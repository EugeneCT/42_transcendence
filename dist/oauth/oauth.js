"use strict";
// Client ID: 811465816616-rvc89rg2o97d9to1431q0c11jl45avk3.apps.googleusercontent.com
// Client Secret: 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
// http://localhost:8000/#state=pass-through%20value&access_token=ya29.A0AS3H6NyLIAwimlidukHySqfQWygj1h6svyFNuHt_U5DkbZmnBLnUeIsEE8oG8xuBEKf3jz6mGc_So3fVu4WfMBVoJMOHFUE0yg2QPiR69UVvdeaSbkk2sK4kza2MRB0bYq6ARb0soxhtdLnmcd3fw2RZ50wTzL-HuzzyDLaBhngvX4rvVsUVwR4T7v438rKj5yptCx0aCgYKAbQSARISFQHGX2MirAWxKQ0RMJ1TkLxNvUVrCQ0206&token_type=Bearer&expires_in=3599&scope=https://www.googleapis.com/auth/calendar.readonly%20https://www.googleapis.com/auth/drive.m
function oauthSignIn() {
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    const form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2Endpoint);
    form.setAttribute('target', '_blank');
    const params = {
        'client_id': '811465816616-rvc89rg2o97d9to1431q0c11jl45avk3.apps.googleusercontent.com',
        'redirect_uri': 'http://localhost:8000',
        'nonce': 'test',
        'response_type': 'id_token',
        'scope': 'openid email profile',
        'state': 'pass-through value' // change this
    };
    for (const p in params) {
        const input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
}
function getToken() {
    const url = window.location.href;
    console.log(url);
}
document.addEventListener('DOMContentLoaded', () => {
    const oauthButton = document.getElementById('oauthButton');
    oauthButton.addEventListener('click', () => {
        getToken();
        console.log('button pressed');
        oauthSignIn();
    });
});
