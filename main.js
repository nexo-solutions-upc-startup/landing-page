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
});
