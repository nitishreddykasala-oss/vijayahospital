/* ============================================
   Vijaya Hospital — Website Scripts
   Mobile menu, smooth scroll, form, back to top
   ============================================ */

(function () {
    "use strict";

    // ==============================
    // 1. Mobile Navigation Menu
    // ==============================

    var hamburger = document.getElementById("hamburger");
    var navList = document.getElementById("navList");
    var mobileNav = null;

    // Build the mobile nav from the existing desktop nav list
    function createMobileNav() {
        if (mobileNav) return;

        mobileNav = document.createElement("div");
        mobileNav.className = "mobile-nav";
        mobileNav.id = "mobileNav";

        // Clone the nav links
        var clonedList = navList.cloneNode(true);
        clonedList.removeAttribute("id");
        mobileNav.appendChild(clonedList);

        // Add action buttons below the links
        var actions = document.createElement("div");
        actions.className = "mobile-nav-actions";

        var callBtn = document.createElement("a");
        callBtn.href = "tel:+919919913369";
        callBtn.className = "btn btn-call";
        callBtn.textContent = "Call Now";

        var whatsappBtn = document.createElement("a");
        whatsappBtn.href = "https://wa.me/919919913369";
        whatsappBtn.className = "btn btn-whatsapp";
        whatsappBtn.target = "_blank";
        whatsappBtn.rel = "noopener";
        whatsappBtn.textContent = "WhatsApp";

        var emergencyBtn = document.createElement("a");
        emergencyBtn.href = "tel:+919919913369";
        emergencyBtn.className = "btn btn-emergency";
        emergencyBtn.textContent = "Emergency";

        actions.appendChild(callBtn);
        actions.appendChild(whatsappBtn);
        actions.appendChild(emergencyBtn);
        mobileNav.appendChild(actions);

        document.body.appendChild(mobileNav);

        // Close mobile nav when any link inside it is clicked
        var mobileLinks = mobileNav.querySelectorAll(".nav-link");
        for (var i = 0; i < mobileLinks.length; i++) {
            mobileLinks[i].addEventListener("click", closeMobileNav);
        }
    }

    function openMobileNav() {
        createMobileNav();
        mobileNav.classList.add("active");
        hamburger.classList.add("active");
        hamburger.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
    }

    function closeMobileNav() {
        if (mobileNav) {
            mobileNav.classList.remove("active");
        }
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    }

    function toggleMobileNav() {
        if (mobileNav && mobileNav.classList.contains("active")) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    }

    if (hamburger) {
        hamburger.addEventListener("click", toggleMobileNav);
    }

    // ==============================
    // 2. Smooth Scrolling
    // ==============================
    // CSS already handles smooth scrolling via scroll-behavior: smooth.
    // This ensures anchor links also work if CSS is overridden.

    var anchorLinks = document.querySelectorAll('a[href^="#"]');

    for (var i = 0; i < anchorLinks.length; i++) {
        anchorLinks[i].addEventListener("click", function (e) {
            var targetId = this.getAttribute("href");

            // Skip if it's just "#" or a tab link
            if (!targetId || targetId === "#") return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
                closeMobileNav();
            }
        });
    }

    // ==============================
    // 3. Active Nav Link on Scroll
    // ==============================

    var sections = document.querySelectorAll("section[id]");

    function setActiveLink() {
        var scrollY = window.scrollY + 120;

        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute("id");

            if (scrollY >= top && scrollY < top + height) {
                // Update desktop nav
                var desktopLinks = navList.querySelectorAll(".nav-link");
                for (var j = 0; j < desktopLinks.length; j++) {
                    desktopLinks[j].classList.remove("active");
                    if (desktopLinks[j].getAttribute("href") === "#" + id) {
                        desktopLinks[j].classList.add("active");
                    }
                }

                // Update mobile nav
                if (mobileNav) {
                    var mobileLinks = mobileNav.querySelectorAll(".nav-link");
                    for (var k = 0; k < mobileLinks.length; k++) {
                        mobileLinks[k].classList.remove("active");
                        if (mobileLinks[k].getAttribute("href") === "#" + id) {
                            mobileLinks[k].classList.add("active");
                        }
                    }
                }
            }
        }
    }

    // ==============================
    // 4. Back to Top Button
    // ==============================

    var backToTop = document.getElementById("backToTop");

    function handleBackToTop() {
        if (!backToTop) return;
        if (window.scrollY > 400) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    }

    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ==============================
    // 5. Header Shadow on Scroll
    // ==============================

    var header = document.getElementById("header");

    function handleHeaderScroll() {
        if (!header) return;
        if (window.scrollY > 10) {
            header.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
        } else {
            header.style.boxShadow = "none";
        }
    }

    // ==============================
    // 6. Scroll Event (throttled)
    // ==============================

    var scrollTicking = false;

    function onScroll() {
        if (!scrollTicking) {
            window.requestAnimationFrame(function () {
                setActiveLink();
                handleBackToTop();
                handleHeaderScroll();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    // ==============================
    // 7. Appointment Form
    // ==============================
    // Uses the phone numbers already present in index.html:
    //   Phone:  9919913369 / 9559399199
    //   WhatsApp: 9919913369

    var appointmentForm = document.getElementById("appointmentForm");

    if (appointmentForm) {
        appointmentForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Get form values
            var name = document.getElementById("patientName").value.trim();
            var phone = document.getElementById("patientPhone").value.trim();
            var department = document.getElementById("department").value;
            var email = document.getElementById("patientEmail").value.trim();
            var date = document.getElementById("appointmentDate").value;
            var time = document.getElementById("preferredTime").value;
            var message = document.getElementById("message").value.trim();

            // Validate required fields
            if (!name) {
                alert("Please enter your full name.");
                return;
            }
            if (!phone) {
                alert("Please enter your phone number.");
                return;
            }
            if (!/^\d{10}$/.test(phone)) {
                alert("Please enter a valid 10-digit phone number.");
                return;
            }
            if (!department) {
                alert("Please select a department.");
                return;
            }

            // Build WhatsApp message from form data
            var lines = [];
            lines.push("Hello, I would like to book an appointment.");
            lines.push("");
            lines.push("Name: " + name);
            lines.push("Phone: " + phone);
            if (email) lines.push("Email: " + email);
            lines.push("Department: " + department);
            if (date) lines.push("Preferred Date: " + date);
            if (time) lines.push("Preferred Time: " + time);
            if (message) lines.push("Message: " + message);

            var whatsappText = lines.join("\n");
            var whatsappUrl = "https://wa.me/919919913369?text=" + encodeURIComponent(whatsappText);

            // Hide form and show success message
            appointmentForm.style.display = "none";

            var successDiv = document.createElement("div");
            successDiv.className = "form-success active";
            successDiv.innerHTML =
                '<div class="form-success-icon">' +
                    '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' +
                "</div>" +
                "<h3>Appointment Request Ready</h3>" +
                "<p>Your details will be sent via WhatsApp. Click below to continue.</p>" +
                '<div style="margin-top: 20px; display: flex; flex-direction: column; gap: 10px;">' +
                    '<a href="' + whatsappUrl + '" target="_blank" rel="noopener" class="btn btn-whatsapp" style="justify-content: center;">Send on WhatsApp</a>' +
                    '<a href="tel:+919919913369" class="btn btn-call" style="justify-content: center;">Or Call: 9919913369</a>' +
                "</div>";

            appointmentForm.parentElement.appendChild(successDiv);
            successDiv.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    }

    // ==============================
    // 8. Date Picker — Set Minimum to Today
    // ==============================

    var dateInput = document.getElementById("appointmentDate");
    if (dateInput) {
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = String(today.getMonth() + 1).padStart(2, "0");
        var dd = String(today.getDate()).padStart(2, "0");
        dateInput.setAttribute("min", yyyy + "-" + mm + "-" + dd);
    }

    // ==============================
    // 9. Run on Page Load
    // ==============================

    handleBackToTop();
    handleHeaderScroll();
    setActiveLink();

})();
