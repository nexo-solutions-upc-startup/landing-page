document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    });

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });

    const demoSosBtn = document.getElementById('demoSosBtn');
    const demoStep1 = document.getElementById('demoStep1');
    const demoStep2 = document.getElementById('demoStep2');
    const demoStep3 = document.getElementById('demoStep3');
    const demoStep4 = document.getElementById('demoStep4');
    const demoSendBtn = document.getElementById('demoSendBtn');
    const demoResetBtn = document.getElementById('demoResetBtn');
    const demoLocation = document.getElementById('demoLocation');
    const demoSelectedType = document.getElementById('demoSelectedType');
    const demoCode = document.getElementById('demoCode');

    const checks = [
        document.getElementById('check1'),
        document.getElementById('check2'),
        document.getElementById('check3'),
        document.getElementById('check4'),
    ];

    function markCheck(index) {
        checks[index].classList.add('done');
        checks[index].querySelector('.check-icon').textContent = '✓';
    }

    function showStep(stepEl) {
        [demoStep1, demoStep2, demoStep3, demoStep4].forEach(s => {
            s.classList.add('hidden');
        });
        stepEl.classList.remove('hidden');
    }

    demoSosBtn.addEventListener('click', () => {
        markCheck(0);
        showStep(demoStep2);
        demoLocation.textContent = 'Detectando ubicación...';
        setTimeout(() => {
            demoLocation.textContent = 'Av. Javier Prado 1540, Lima ✓';
        }, 1200);
    });

    document.querySelectorAll('.demo__cat').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.demo__cat').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            const type = btn.getAttribute('data-type');
            demoSelectedType.textContent = btn.textContent.trim().replace(/\s+/g,' ') + ' — ' + type;
            markCheck(1);
            setTimeout(() => {
                showStep(demoStep3);
            }, 400);
        });
    });

    demoSendBtn.addEventListener('click', () => {
        markCheck(2);
        demoSendBtn.textContent = 'Enviando...';
        demoSendBtn.disabled = true;
        setTimeout(() => {
            markCheck(3);
            const code = '#NX-' + Math.floor(1000 + Math.random() * 9000);
            demoCode.textContent = code;
            showStep(demoStep4);
            demoSendBtn.textContent = 'Enviar reporte';
            demoSendBtn.disabled = false;
        }, 1000);
    });

    demoResetBtn.addEventListener('click', () => {
        checks.forEach(c => {
            c.classList.remove('done');
            c.querySelector('.check-icon').textContent = '○';
        });
        document.querySelectorAll('.demo__cat').forEach(b => b.classList.remove('selected'));
        showStep(demoStep1);
    });

    const mapFilters = document.querySelectorAll('.map-filter');
    const mapIncidents = document.querySelectorAll('.map-incident');

    mapFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            mapFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            mapIncidents.forEach(inc => {
                if (filter === 'all') {
                    inc.style.display = 'block';
                } else {
                    const type = inc.getAttribute('data-type').toLowerCase();
                    inc.style.display = type.includes(filter) ? 'block' : 'none';
                }
            });
        });
    });

    const accTabs = document.querySelectorAll('.acc-tab');
    accTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            accTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const acc = tab.getAttribute('data-acc');
            document.querySelectorAll('.acc-panel').forEach(p => p.classList.remove('active'));
            document.getElementById('acc-' + acc).classList.add('active');
        });
    });

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function setError(inputId, errorId, msg) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);
        if (input) input.classList.add('error');
        if (error) error.textContent = msg;
    }

    function clearError(inputId, errorId) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);
        if (input) input.classList.remove('error');
        if (error) error.textContent = '';
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;
            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const pass = document.getElementById('regPass').value;
            const pass2 = document.getElementById('regPass2').value;
            const terms = document.getElementById('regTerms').checked;

            clearError('regName', 'regNameError');
            clearError('regEmail', 'regEmailError');
            clearError('regPass', 'regPassError');
            clearError('regPass2', 'regPass2Error');

            if (!name) { setError('regName', 'regNameError', 'Ingresa tu nombre.'); valid = false; }
            if (!validateEmail(email)) { setError('regEmail', 'regEmailError', 'Correo inválido.'); valid = false; }
            if (pass.length < 8) { setError('regPass', 'regPassError', 'Mínimo 8 caracteres.'); valid = false; }
            if (pass !== pass2) { setError('regPass2', 'regPass2Error', 'Las contraseñas no coinciden.'); valid = false; }
            if (!terms) { valid = false; }

            if (valid) {
                registerForm.classList.add('hidden');
                document.getElementById('regSuccess').classList.remove('hidden');
            }
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;
            const email = document.getElementById('loginEmail').value.trim();
            const pass = document.getElementById('loginPass').value;

            clearError('loginEmail', 'loginEmailError');
            clearError('loginPass', 'loginPassError');

            if (!validateEmail(email)) { setError('loginEmail', 'loginEmailError', 'Correo inválido.'); valid = false; }
            if (!pass) { setError('loginPass', 'loginPassError', 'Ingresa tu contraseña.'); valid = false; }

            if (valid) {
                loginForm.classList.add('hidden');
                document.getElementById('loginSuccess').classList.remove('hidden');
            }
        });
    }

    const recoverLink = document.getElementById('recoverLink');
    if (recoverLink) {
        recoverLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.add('hidden');
            document.getElementById('recoverPanel').classList.remove('hidden');
        });
    }

    const sendRecoverBtn = document.getElementById('sendRecoverBtn');
    if (sendRecoverBtn) {
        sendRecoverBtn.addEventListener('click', () => {
            const email = document.getElementById('recoverEmail').value.trim();
            if (validateEmail(email)) {
                sendRecoverBtn.disabled = true;
                sendRecoverBtn.textContent = 'Enviando...';
                setTimeout(() => {
                    document.getElementById('recoverMsg').classList.remove('hidden');
                    sendRecoverBtn.textContent = 'Enviado';
                }, 800);
            }
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const msg = document.getElementById('contactMessage').value.trim();

            clearError('contactName', 'contactNameError');
            clearError('contactEmail', 'contactEmailError');
            clearError('contactMessage', 'contactMsgError');

            if (!name) { setError('contactName', 'contactNameError', 'Ingresa tu nombre.'); valid = false; }
            if (!validateEmail(email)) { setError('contactEmail', 'contactEmailError', 'Correo inválido.'); valid = false; }
            if (!msg) { setError('contactMessage', 'contactMsgError', 'Escribe un mensaje.'); valid = false; }

            if (valid) {
                contactForm.classList.add('hidden');
                document.getElementById('contactSuccess').classList.remove('hidden');
            }
        });
    }
});
