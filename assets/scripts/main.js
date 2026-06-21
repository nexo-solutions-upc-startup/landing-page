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

    // ===== OPERADOR — TABS =====
    const opTabs = document.querySelectorAll('.op-tab');
    const opPanels = document.querySelectorAll('.op-panel');

    opTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            opTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const id = tab.getAttribute('data-optab');
            opPanels.forEach(p => p.classList.remove('active'));
            const target = document.getElementById('optab-' + id);
            if (target) target.classList.add('active');
        });
    });

    // US33 Ver detalle de incidente
    document.querySelectorAll('.op-btn--view').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const list = document.getElementById('opIncidentsList');
            const detail = document.getElementById('opDetail');
            const content = document.getElementById('opDetailContent');
            const map = {
                INC001: { type: 'Accidente vehicular con heridos', loc: 'Av. Javier Prado Este 2140, San Isidro', time: 'Hace 3 min', reporter: 'Ciudadano anónimo', media: 'Foto adjunta', status: 'Pendiente de asignación' },
                INC002: { type: 'Fuga de gas domiciliaria', loc: 'San Isidro, Calle Las Magnolias 380', time: 'Hace 8 min', reporter: 'María Ramos', media: 'Sin evidencia', status: 'Pendiente de validación' },
                INC003: { type: 'Robo al paso', loc: 'Miraflores, Av. Larco 400', time: 'Hace 12 min', reporter: 'Reporte anónimo', media: 'Video adjunto', status: 'Pendiente de asignación' },
            };
            const d = map[id];
            if (!d) return;
            content.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:10px">
          <div><strong>Tipo:</strong> ${d.type}</div>
          <div><strong>Ubicación:</strong> ${d.loc}</div>
          <div><strong>Recibido:</strong> ${d.time}</div>
          <div><strong>Reportado por:</strong> ${d.reporter}</div>
          <div><strong>Evidencia:</strong> ${d.media}</div>
          <div><strong>Estado:</strong> <span style="color:var(--red);font-weight:600">${d.status}</span></div>
          <div style="margin-top:8px;padding:12px;background:rgba(229,57,53,0.06);border-radius:8px;font-size:0.8rem;color:var(--gray-3)">📎 La evidencia multimedia solo es visible en la aplicación oficial de operadores.</div>
        </div>`;
            list.classList.add('hidden');
            detail.classList.remove('hidden');
        });
    });

    const opDetailBack = document.getElementById('opDetailBack');
    if (opDetailBack) {
        opDetailBack.addEventListener('click', () => {
            document.getElementById('opIncidentsList').classList.remove('hidden');
            document.getElementById('opDetail').classList.add('hidden');
        });
    }

    // US32 Asignar desde monitor
    document.querySelectorAll('.op-btn--assign').forEach(btn => {
        btn.addEventListener('click', () => {
            opTabs.forEach(t => t.classList.remove('active'));
            opPanels.forEach(p => p.classList.remove('active'));
            document.querySelector('[data-optab="assign"]').classList.add('active');
            document.getElementById('optab-assign').classList.add('active');
            const id = btn.getAttribute('data-id');
            const sel = document.getElementById('assignIncidentSelect');
            if (sel) sel.value = id;
        });
    });

    // US31 Validar reportes
    document.querySelectorAll('.op-btn--confirm').forEach(btn => {
        const vid = btn.getAttribute('data-vid');
        if (!vid) return;
        btn.addEventListener('click', () => {
            const item = document.getElementById(vid);
            if (item) {
                item.classList.add('confirmed');
                item.querySelectorAll('button').forEach(b => b.disabled = true);
                const badge = document.createElement('span');
                badge.textContent = '✓ Confirmado';
                badge.style.cssText = 'font-size:0.75rem;font-weight:700;color:#388E3C;padding:4px 8px;background:rgba(76,175,80,0.12);border-radius:4px;';
                item.querySelector('.validate-item__actions').appendChild(badge);
                checkValidateEmpty();
            }
        });
    });

    document.querySelectorAll('.op-btn--discard').forEach(btn => {
        const vid = btn.getAttribute('data-vid');
        if (!vid) return;
        btn.addEventListener('click', () => {
            const item = document.getElementById(vid);
            if (item) {
                item.classList.add('discarded');
                item.querySelectorAll('button').forEach(b => b.disabled = true);
                checkValidateEmpty();
            }
        });
    });

    document.querySelectorAll('.op-btn--dup').forEach(btn => {
        btn.addEventListener('click', () => {
            const vid = btn.getAttribute('data-vid');
            const item = document.getElementById(vid);
            if (item) {
                const flag = document.createElement('span');
                flag.className = 'val-flag val-flag--err';
                flag.textContent = 'Marcado como duplicado';
                item.querySelector('.validate-item__flags').appendChild(flag);
                btn.disabled = true;
            }
        });
    });

    function checkValidateEmpty() {
        const items = document.querySelectorAll('.validate-item');
        const allDone = [...items].every(i => i.classList.contains('confirmed') || i.classList.contains('discarded'));
        if (allDone) document.getElementById('validateEmpty').classList.remove('hidden');
    }

    // US32 Asignar unidades
    document.querySelectorAll('.unit-assign-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const incSel = document.getElementById('assignIncidentSelect');
            if (!incSel.value) {
                const fb = document.getElementById('assignFeedback');
                fb.textContent = '⚠ Selecciona primero un incidente.';
                fb.style.background = 'rgba(229,57,53,0.08)';
                fb.style.color = 'var(--red)';
                fb.classList.remove('hidden');
                setTimeout(() => fb.classList.add('hidden'), 2000);
                return;
            }
            const unit = btn.getAttribute('data-unit');
            btn.classList.add('assigned-btn');
            btn.textContent = '✓ Asignado';
            btn.disabled = true;
            btn.closest('.unit-card').classList.add('assigned');
            const closeBtn = document.getElementById('closeIncidentBtn');
            if (closeBtn) closeBtn.disabled = false;
            const fb = document.getElementById('assignFeedback');
            fb.textContent = `✓ ${unit} asignado al incidente. La unidad fue notificada.`;
            fb.style.background = '';
            fb.style.color = '';
            fb.classList.remove('hidden');
            const stat = document.getElementById('opActive');
            if (stat) stat.textContent = parseInt(stat.textContent) + 1;
        });
    });

    // US37 Escalar
    const escalateBtn = document.getElementById('escalateBtn');
    if (escalateBtn) {
        escalateBtn.addEventListener('click', () => {
            const fb = document.getElementById('assignFeedback');
            fb.textContent = '↑ Incidente escalado a Defensa Civil. Se notificó al jefe de turno.';
            fb.classList.remove('hidden');
            escalateBtn.disabled = true;
            escalateBtn.textContent = '↑ Escalado ✓';
        });
    }

    // US39 Contactar ciudadano
    const contactCitizenBtn = document.getElementById('contactCitizenBtn');
    if (contactCitizenBtn) {
        contactCitizenBtn.addEventListener('click', () => {
            const fb = document.getElementById('assignFeedback');
            fb.textContent = '📞 Notificación enviada al ciudadano con el estado de su reporte.';
            fb.classList.remove('hidden');
            contactCitizenBtn.disabled = true;
            contactCitizenBtn.textContent = '📞 Ciudadano contactado ✓';
        });
    }

    // US35 Actualizar estado
    const updateStatusBtn = document.getElementById('updateStatusBtn');
    if (updateStatusBtn) {
        updateStatusBtn.addEventListener('click', () => {
            const fb = document.getElementById('assignFeedback');
            fb.textContent = '⟳ Estado actualizado a "En proceso". El ciudadano fue notificado.';
            fb.classList.remove('hidden');
        });
    }

    // US34 Cerrar incidente
    const closeIncidentBtn = document.getElementById('closeIncidentBtn');
    if (closeIncidentBtn) {
        closeIncidentBtn.addEventListener('click', () => {
            const fb = document.getElementById('assignFeedback');
            fb.textContent = '✓ Incidente cerrado y registrado en el historial. Recursos liberados.';
            fb.classList.remove('hidden');
            closeIncidentBtn.disabled = true;
            closeIncidentBtn.textContent = '✓ Cerrado';
            const pending = document.getElementById('opPending');
            const resolved = document.getElementById('opResolved');
            if (pending) pending.textContent = Math.max(0, parseInt(pending.textContent) - 1);
            if (resolved) resolved.textContent = parseInt(resolved.textContent) + 1;
        });
    }

    // US40 Exportar historial
    const exportHistoryBtn = document.getElementById('exportHistoryBtn');
    if (exportHistoryBtn) {
        exportHistoryBtn.addEventListener('click', () => {
            exportHistoryBtn.textContent = '⏳ Generando...';
            exportHistoryBtn.disabled = true;
            setTimeout(() => {
                document.getElementById('exportNote').classList.remove('hidden');
                exportHistoryBtn.textContent = '⬇ Exportar';
                exportHistoryBtn.disabled = false;
            }, 1200);
        });
    }

    // US46 Alertas masivas
    const adminAlertBtn = document.getElementById('adminAlertBtn');
    const adminMassAlert = document.getElementById('adminMassAlert');
    const cancelMassAlertBtn = document.getElementById('cancelMassAlertBtn');
    const sendMassAlertBtn = document.getElementById('sendMassAlertBtn');

    if (adminAlertBtn) {
        adminAlertBtn.addEventListener('click', () => {
            document.querySelectorAll('.admin-modal').forEach(m => m.classList.add('hidden'));
            adminMassAlert.classList.toggle('hidden');
        });
    }

    if (cancelMassAlertBtn) {
        cancelMassAlertBtn.addEventListener('click', () => adminMassAlert.classList.add('hidden'));
    }

    if (sendMassAlertBtn) {
        sendMassAlertBtn.addEventListener('click', () => {
            const msg = document.getElementById('massAlertMsg').value.trim();
            if (!msg) { document.getElementById('massAlertMsg').style.borderColor = 'var(--red)'; return; }
            sendMassAlertBtn.textContent = 'Enviando...';
            sendMassAlertBtn.disabled = true;
            setTimeout(() => {
                document.getElementById('massAlertSent').classList.remove('hidden');
                sendMassAlertBtn.textContent = 'Enviar alerta';
                sendMassAlertBtn.disabled = false;
            }, 1000);
        });
    }

    // US43 Gestionar usuarios
    const adminUsersBtn = document.getElementById('adminUsersBtn');
    const adminUsersPanel = document.getElementById('adminUsersPanel');
    const closeUsersPanel = document.getElementById('closeUsersPanel');

    if (adminUsersBtn) {
        adminUsersBtn.addEventListener('click', () => {
            document.querySelectorAll('.admin-modal').forEach(m => m.classList.add('hidden'));
            adminUsersPanel.classList.toggle('hidden');
        });
    }

    if (closeUsersPanel) {
        closeUsersPanel.addEventListener('click', () => adminUsersPanel.classList.add('hidden'));
    }

    // US44 Bloquear usuarios
    document.querySelectorAll('[data-ubtn]').forEach(btn => {
        btn.addEventListener('click', () => {
            const row = btn.closest('tr');
            const badge = row.querySelector('.u-badge');
            if (badge.classList.contains('u-badge--active')) {
                badge.textContent = 'Bloqueado';
                badge.classList.remove('u-badge--active');
                badge.classList.add('u-badge--blocked');
                btn.textContent = 'Activar';
                btn.classList.remove('op-btn--discard');
                btn.classList.add('op-btn--confirm');
            } else {
                badge.textContent = 'Activo';
                badge.classList.remove('u-badge--blocked');
                badge.classList.add('u-badge--active');
                btn.textContent = 'Bloquear';
                btn.classList.remove('op-btn--confirm');
                btn.classList.add('op-btn--discard');
            }
        });
    });

    // US42 Exportar reportes
    const adminExportBtn = document.getElementById('adminExportBtn');
    if (adminExportBtn) {
        adminExportBtn.addEventListener('click', () => {
            adminExportBtn.querySelector('strong').textContent = 'Exportando...';
            setTimeout(() => {
                adminExportBtn.querySelector('strong').textContent = 'Exportar reportes';
                const fb = document.createElement('p');
                fb.textContent = '✓ Reporte exportado como PDF.';
                fb.style.cssText = 'font-size:0.8rem;color:#4CAF50;margin-top:8px;';
                adminExportBtn.parentNode.appendChild(fb);
                setTimeout(() => fb.remove(), 2500);
            }, 1000);
        });
    }

    // US41 Estadísticas / US48 Tendencias / US49 Auditorías / US50 Encuestas / US45 Operadores
    ['adminStatsBtn', 'adminAuditBtn', 'adminSurveyBtn', 'adminOpsBtn'].forEach(id => {
        const btn = document.getElementById(id);
        if (!btn) return;
        const msgs = {
            adminStatsBtn: '📈 Módulo de tendencias y tiempos de respuesta disponible en la versión web completa.',
            adminAuditBtn: '🔍 Registro de auditorías del sistema disponible para administradores con acceso completo.',
            adminSurveyBtn: '📋 Encuesta de satisfacción enviada a los últimos 100 usuarios activos.',
            adminOpsBtn: '👮 Panel de gestión de operadores disponible en el sistema de administración.',
        };
        btn.addEventListener('click', () => {
            document.querySelectorAll('.admin-modal').forEach(m => m.classList.add('hidden'));
            const fb = document.createElement('div');
            fb.className = 'admin-modal';
            fb.style.marginTop = '8px';
            fb.innerHTML = `<p style="font-size:0.88rem;color:var(--dark);line-height:1.6">${msgs[id]}</p><button class="btn btn--ghost" style="margin-top:12px;font-size:0.82rem" onclick="this.closest('.admin-modal').remove()">Cerrar</button>`;
            btn.closest('.admin-actions-grid').after(fb);
        });
    });

    // ===== PERFIL =====
    const profileNavItems = document.querySelectorAll('.profile__nav-item');
    const profilePanels = document.querySelectorAll('.profile__panel');

    profileNavItems.forEach(btn => {
        btn.addEventListener('click', () => {
            profileNavItems.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const tab = btn.getAttribute('data-ptab');
            profilePanels.forEach(p => p.classList.remove('active'));
            const target = document.getElementById('ptab-' + tab);
            if (target) target.classList.add('active');
        });
    });

    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('pName').value.trim();
            const lastname = document.getElementById('pLastname').value.trim();
            if (name && lastname) {
                document.getElementById('avatarCircle').textContent = (name[0] + lastname[0]).toUpperCase();
            }
            const msg = document.getElementById('profileSaveMsg');
            msg.classList.remove('hidden');
            setTimeout(() => msg.classList.add('hidden'), 2500);
        });
    }

    const savePrivacyBtn = document.getElementById('savePrivacyBtn');
    if (savePrivacyBtn) {
        savePrivacyBtn.addEventListener('click', () => {
            const msg = document.getElementById('privacySaveMsg');
            msg.classList.remove('hidden');
            setTimeout(() => msg.classList.add('hidden'), 2500);
        });
    }

    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            themeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    const saveAppearanceBtn = document.getElementById('saveAppearanceBtn');
    if (saveAppearanceBtn) {
        saveAppearanceBtn.addEventListener('click', () => {
            const msg = document.getElementById('appearanceSaveMsg');
            msg.classList.remove('hidden');
            setTimeout(() => msg.classList.add('hidden'), 2500);
        });
    }

    document.querySelectorAll('.sync-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.sync-item').style.opacity = '0.4';
            btn.textContent = 'Desconectado';
            btn.style.color = 'var(--gray-3)';
            btn.disabled = true;
        });
    });

    const addDeviceBtn = document.getElementById('addDeviceBtn');
    if (addDeviceBtn) {
        addDeviceBtn.addEventListener('click', () => {
            const note = document.getElementById('syncNote');
            note.classList.remove('hidden');
            addDeviceBtn.textContent = 'Enlace enviado ✓';
            addDeviceBtn.disabled = true;
        });
    }

    const deleteConfirmInput = document.getElementById('deleteConfirm');
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    if (deleteConfirmInput && deleteAccountBtn) {
        deleteConfirmInput.addEventListener('input', () => {
            deleteAccountBtn.disabled = deleteConfirmInput.value !== 'ELIMINAR';
        });
        deleteAccountBtn.addEventListener('click', () => {
            document.getElementById('deleteSuccess').classList.remove('hidden');
            deleteAccountBtn.disabled = true;
        });
    }

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .benefit-item, .stat-card, .step, .hist-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        fadeObserver.observe(el);
    });

    const miniCats = document.querySelectorAll('.mini-cat');
    let miniIndex = 0;
    setInterval(() => {
        miniCats.forEach(c => c.classList.remove('active'));
        miniCats[miniIndex % miniCats.length].classList.add('active');
        miniIndex++;
    }, 1800);

    const statNumbers = document.querySelectorAll('.stat-card__number');
    let statsAnimated = false;

    function animateStats() {
        statNumbers.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            const timer = setInterval(() => {
                current = Math.min(current + step, target);
                el.textContent = Math.floor(current).toLocaleString('es-PE');
                if (current >= target) clearInterval(timer);
            }, 16);
        });
    }

    const statsSection = document.getElementById('stats');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateStats();
            }
        });
    }, { threshold: 0.3 });
    if (statsSection) statsObserver.observe(statsSection);

    const segTabs = document.querySelectorAll('.seg-tab');
    segTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            segTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const seg = tab.getAttribute('data-seg');
            document.querySelectorAll('.seg-panel').forEach(p => p.classList.remove('active'));
            document.getElementById('seg-' + seg).classList.add('active');
        });
    });

    const histFilters = document.querySelectorAll('.hist-filter');
    const histItems = document.querySelectorAll('.hist-item');

    histFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            histFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-hfilter');
            histItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'flex';
                } else {
                    item.style.display = item.getAttribute('data-status') === filter ? 'flex' : 'none';
                }
            });
        });
    });

    const sosFab = document.getElementById('sosFab');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollY / docHeight;
        sosFab.style.opacity = progress < 0.05 ? '0' : '1';
        sosFab.style.pointerEvents = progress < 0.05 ? 'none' : 'auto';
    });

    sosFab.style.opacity = '0';
    sosFab.style.pointerEvents = 'none';
    sosFab.style.transition = 'opacity 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease';

    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');

    sosFab.addEventListener('click', () => {
        document.getElementById('modalSuccess').classList.add('hidden');
        document.querySelectorAll('.modal-cat').forEach(b => b.classList.remove('selected-modal'));
        modalOverlay.classList.remove('hidden');
    });

    modalClose.addEventListener('click', () => {
        modalOverlay.classList.add('hidden');
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) modalOverlay.classList.add('hidden');
    });

    document.querySelectorAll('.modal-cat').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-mtype');
            btn.textContent = '⏳ Enviando...';
            btn.disabled = true;
            setTimeout(() => {
                const code = '#NX-' + Math.floor(1000 + Math.random() * 9000);
                document.getElementById('modalCode').textContent = code;
                document.getElementById('modalSuccess').classList.remove('hidden');
                document.querySelector('.modal__cats').classList.add('hidden');
                btn.textContent = type;
                btn.disabled = false;
            }, 1000);
        });
    });
});
