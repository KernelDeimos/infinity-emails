// const users = [];
const idx_emails = {};

const clean_email = email => {
    // remove sub-address
    email = email.split('+')[0];

    // remove dots IFF they're on a specified domain
    const domains_nondistinct = {
        'googlemail.com': 'gmail.com',
    };
    const domains_distinct = {
        'yahoo.co.uk': 'yahoo.com',
    }
    const domains = [
        'icloud.com',
        'mac.com',
    ];
    const no_subaddress_domains = [
        'yahoo.com',
    ];
    let [local, domain] = email.split('@');
    domain = domains_nondistinct[domain] || domain;
    local = local.replace(/\./g, '');
    return `${local}@${domain}`;
};

document.addEventListener('DOMContentLoaded', () => {
    const formEl = document.getElementById('form_create_account');
    const msgEl = document.getElementById('message');
    formEl.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(formEl);
        let email = formData.get('email');
        email = clean_email(email);
        if (idx_emails[email]) {
            msgEl.innerText = 'Email already exists';
            return;
        }
        msgEl.innerText = 'Account created';
        idx_emails[email] = true;
    });
    msgEl.addEventListener('click', () => {
        msgEl.innerText = '';
    });
});