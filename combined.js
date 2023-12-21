        async function checkPasswordStrength() {
        var password = document.getElementById('password').value;
        var strengthText = document.getElementById('strength-text');
        var strengthNote = document.getElementById('strength-note');

        strengthText.style.color = '';
        strengthNote.style.color = '';

        var strength = 0;

       
        if (password.length >= 8) {
            strength++;
        }

        
        if (/[A-Z]/.test(password)) {
            strength++;
        }

        if (/[a-z]/.test(password)) {
            strength++;
        }


        if (/\d/.test(password)) {
            strength++;
        }

       
        if (/[^A-Za-z0-9]/.test(password)) {
            strength++;
        }

        if (strength === 5) {
            strengthText.textContent = 'Strong';
            strengthText.style.color = '#008000';
            strengthNote.textContent = 'Great job! You have a strong password. Your accounts are well-protected.';
            strengthNote.style.color = '#008000';
        } else if (strength >= 3) {
            strengthText.textContent = 'Medium';
            strengthText.style.color = '#ffa500';
            strengthNote.textContent = 'Your password is decent, but not so strong. Consider adding more complexity for better security.';
            strengthNote.style.color = '#ffa500';
        } else {
            strengthText.textContent = 'Weak';
            strengthText.style.color = '#ff0000';
            strengthNote.textContent = 'It\'s important to strengthen your password. Consider adding more characters and variety for better security.';
            strengthNote.style.color = '#ff0000';
        }
    }

    async function checkDataBreach() {
        const passwordInput = document.getElementById('password-data-breach');
        const password = passwordInput.value;

        const hashedPassword = await sha1(password);
        const prefix = hashedPassword.substring(0, 5);
        const suffix = hashedPassword.substring(5);

        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        const data = await response.text();

        const regex = new RegExp(`${suffix}:\\d+`, 'i');
        const match = data.match(regex);

        const resultBreach = document.getElementById('result-breach');

        if (match) {
            resultBreach.innerText = 'Password found in data breaches.If you are currently using this password on any platform, please change it as soon as possible. ';
            resultBreach.style.color = '#ff0000';
        } else {
            resultBreach.innerText = 'Password not found in data breaches. Thats good news! But, to be extra safe, please use our password checker to make sure your password is really strong.';
            resultBreach.style.color = '#008000';
            
        }
    }

    async function sha1(message) {
        const encoder = new TextEncoder();
        const data = encoder.encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-1', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashHex.toUpperCase();
    }

    document.getElementById('password').addEventListener('click', function () {
        togglePasswordVisibility('password', 'toggle-text');
    });

    document.getElementById('password-data-breach').addEventListener('click', function () {
        togglePasswordVisibility('password-data-breach', 'toggle-text-breach');
    });


    function togglePasswordVisibility(inputId, toggleTextId) {
        var passwordField = document.getElementById(inputId);
        var toggleText = document.querySelector("#" + toggleTextId); 

        if (passwordField.type === "password") {
            passwordField.type = "text";
            toggleText.textContent = "Hide";
        } else {
            passwordField.type = "password";
            toggleText.textContent = "Show";
        }
    }

    
    document.getElementById('password').addEventListener('click', function () {
        togglePasswordVisibility('password', 'toggle-text');
    });

    document.getElementById('password-data-breach').addEventListener('click', function () {
        togglePasswordVisibility('password-data-breach', 'toggle-text-breach');
    });

    function togglePasswordVisibility(passwordId, toggleTextId) {
        var passwordField = document.getElementById(passwordId);
        var toggleText = document.getElementById(toggleTextId);

        if (passwordField.type === "password") {
            passwordField.type = "text";
            toggleText.textContent = "Hide";
        } else {
            passwordField.type = "password";
            toggleText.textContent = "Show";
        }
    }

    function togglePasswordButton(passwordId, toggleTextId) {
        var passwordField = document.getElementById(passwordId);
        var toggleText = document.getElementById(toggleTextId);

        toggleText.style.display = passwordField.value.length > 0 ? 'block' : 'none';
    }