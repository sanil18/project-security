
        function generatePassword() {
            const length = document.getElementById('passwordLength').value;
            const includeUppercase = document.getElementById('includeUppercase').checked;
            const includeNumbers = document.getElementById('includeNumbers').checked;
            const includeSpecialChars = document.getElementById('includeSpecialChars').checked;
    
            const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
            const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const numberChars = '0123456789';
            const specialChars = '!@#$%^&*()-=_+[]{}|;:,.<>?';
    
            let chars = lowercaseChars;
    
            if (includeUppercase) chars += uppercaseChars;
            if (includeNumbers) chars += numberChars;
            if (includeSpecialChars) chars += specialChars;
    
            let password = generateRandomPassword(chars, length);
    
            document.getElementById('generatedPassword').value = password;
        }
    
        function generateRandomPassword(chars, length) {
            const randomValues = new Uint32Array(length);
            crypto.getRandomValues(randomValues);
    
            let password = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = randomValues[i] % chars.length;
                password += chars.charAt(randomIndex);
            }
    
            return password;
        }
    
        function copyToClipboard() {
            const passwordField = document.getElementById('generatedPassword');
            passwordField.select();
            document.execCommand('copy');
            alert('Password copied to clipboard!');
        }


        function enhancePassword() {
           
            const inputPassword = document.getElementById('inputPassword').value;
      
            const enhancedPassword = enhanceUserPassword(inputPassword);
      
          
            document.getElementById('output').innerText = `Enhanced Password: ${enhancedPassword}`;
          }
      
          function enhanceUserPassword(password) {
          
            const additionalCharacters = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      
           
            const capitalizedPassword = password.charAt(0).toUpperCase() + password.slice(1);
      
           
            const enhancedPassword =
              capitalizedPassword +
              getRandomCharacter(additionalCharacters) +
              getRandomCharacter(additionalCharacters) +
              getRandomNumber() +
              getRandomNumber() +
              getRandomCharacter(additionalCharacters) +
              getRandomCharacter(additionalCharacters);
      
            return enhancedPassword;
          }
      
          function getRandomCharacter(characterSet) {
            
          return characterSet.charAt(Math.floor(Math.random() * characterSet.length));
          }
      
          function getRandomNumber() {          
          return Math.floor(Math.random() * 10);
          }